package com.ujjaval.ecommerce.searchsuggestionservice.service;

import com.ujjaval.ecommerce.searchsuggestionservice.dto.SearchSuggestionKeywordInfo;
import com.ujjaval.ecommerce.searchsuggestionservice.util.Permutation;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;

@Service
public class SearchSuggestionServiceImpl implements SearchSuggestionService {
    HashMap<String, List<SearchSuggestionKeywordInfo>> prefixKeywordsMap = new HashMap<>();
    List<SearchSuggestionKeywordInfo> defaultSearchSuggestionList = new LinkedList<>();

    private JSONObject parseJSONObject(String json) throws JSONException {
        return new JSONObject(json);
    }

    private JSONArray parseJSONArray(JSONObject jsonObject, String key) throws JSONException {
        return jsonObject.getJSONArray(key);
    }

    private void addJsonObjKeywordToMap(JSONObject jsonResponse, String key, String attributeName) throws JSONException {
        JSONArray jsonArray = parseJSONArray(jsonResponse, key);

        for (int index = 0; index < jsonArray.length(); ++index) {
            JSONObject jsonObject = new JSONObject(jsonArray.get(index).toString());
            StringBuilder filterLink = new StringBuilder();
            addSearchSuggestionKeywords(jsonObject.getString("type"),
                    filterLink.append(attributeName).append("=").append(jsonObject.getString("id")));
            if (index < 10 && attributeName.equals("apparels")) {
                defaultSearchSuggestionList.add(new SearchSuggestionKeywordInfo(jsonObject.getString("type"),
                        filterLink, 1));
            }
        }
    }

    private void addKeywordToMap(JSONObject jsonResponse, String key) throws JSONException {
        JSONArray jsonArray = parseJSONArray(jsonResponse, key);

        for (int index = 0; index < jsonArray.length(); ++index) {
            StringBuilder filterLink = new StringBuilder();
            addSearchSuggestionKeywords(jsonArray.get(index).toString(),
                    filterLink.append("productname=").append(jsonArray.get(index).toString()));
        }
    }

    private void constructAndAddKeywordCombination(JSONObject jsonResponse, String key, String[] attributeNames) throws JSONException {
        JSONArray jsonArray = parseJSONArray(jsonResponse, key);

        for (int index = 0; index < jsonArray.length(); ++index) {
            JSONObject jsonObject = new JSONObject(jsonArray.get(index).toString());
            int noOfAttributes = attributeNames.length;
            String[] keywords = new String[noOfAttributes];
            StringBuilder filterLink = new StringBuilder();
            for (int attrIndex = 1; attrIndex <= noOfAttributes; ++attrIndex) {
                keywords[attrIndex - 1] = jsonObject.getString(String.format("attr%d_type", attrIndex));
                filterLink.append(attributeNames[attrIndex - 1]).append("=")
                        .append(jsonObject.getString(String.format("attr%d_id", attrIndex))).append("::");
            }

            if(filterLink.charAt(filterLink.length() - 1) == ':') {
                filterLink.setLength(filterLink.length() - 2);
            }

            Permutation permutation = new Permutation(keywords);
            for (String keyword : permutation.getOutput()) {
                addSearchSuggestionKeywords(keyword, filterLink);
            }
        }
    }

    private void addSearchSuggestionKeywords(String keyword, StringBuilder link) {
        for (int index = 0; index < keyword.length(); ++index) {
            String prefix = keyword.substring(0, index + 1).toLowerCase();
            if (!prefixKeywordsMap.containsKey(prefix)) {
                prefixKeywordsMap.put(prefix, new ArrayList<>(Arrays.asList(
                        new SearchSuggestionKeywordInfo(keyword, link, 1))));
            } else {
                List<SearchSuggestionKeywordInfo> keywordList = prefixKeywordsMap.get(prefix);
                keywordList.add(new SearchSuggestionKeywordInfo(keyword, link, 1));
            }
        }
    }

    public void loadSearchSuggestionToMap() {
        String URL = System.getenv("COMMON_DATA_SERVICE_URL") + "/search-suggestion-list";

        while (true) {
            try {
                HttpClient client = HttpClient.newHttpClient();
                HttpRequest request = HttpRequest.newBuilder()
                        .GET()
                        .header("accept", "application/json")
                        .uri(URI.create(URL))
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                if (response.statusCode() == 200) {
                    //Read JSON response and print
                    JSONObject jsonResponse = parseJSONObject(response.body());

                    addJsonObjKeywordToMap(jsonResponse, "genderKeywords", "genders");
                    addJsonObjKeywordToMap(jsonResponse, "brandKeywords", "brands");
                    addJsonObjKeywordToMap(jsonResponse, "apparelKeywords", "apparels");
                    addKeywordToMap(jsonResponse, "productKeywords");

                    constructAndAddKeywordCombination(jsonResponse, "genderApparelKeywords",
                            new String[]{"genders", "apparels"});
                    constructAndAddKeywordCombination(jsonResponse, "genderBrandKeywords",
                            new String[]{"genders", "brands"});
                    constructAndAddKeywordCombination(jsonResponse, "apparelBrandKeywords",
                            new String[]{"apparels", "brands"});
                    constructAndAddKeywordCombination(jsonResponse, "threeAttrKeywords",
                            new String[]{"genders", "apparels", "brands"});

                    System.out.println("prefixKeywordsMap = " + prefixKeywordsMap.size());
                    break;

                } else {
                    System.out.println("Error: Unable to connect Search Suggestion API status code = "
                            + response.statusCode());
                }
            } catch (IOException | InterruptedException ioException) {
                System.out.println("Error: Unable to connect Search Suggestion API. May be server is down");
                System.out.println("errorMsg = " + ioException);
            } catch (JSONException jsonException) {
                System.out.println("Error: Unable to json parse Search Suggestion API");
                System.out.println("errorMsg = " + jsonException);
                return;
            } catch (Exception e) {
                System.out.println("Error: something went wrong. Unknown Problem.");
                System.out.println("errorMsg = " + e);
                return;
            }

            try {
                Thread.sleep(5000);
                System.out.println("Retrying connection again after 5 seconds....");
            } catch (InterruptedException e) {
                System.out.println("Error: Unable to sleep");
            }

        }
    }

    public List<SearchSuggestionKeywordInfo> searchKeywordFromMap(String q) {
        List<SearchSuggestionKeywordInfo> resultList = null;
        for (int index = q.length(); index > 0; --index) {
            String prefix = q.substring(0, index).toLowerCase();
            if (prefixKeywordsMap.containsKey(prefix)) {
                resultList = prefixKeywordsMap.get(prefix);
                break;
            }
        }

        return resultList;
    }

    public List<SearchSuggestionKeywordInfo> getDefaultSearchSuggestions() {
        return defaultSearchSuggestionList;
    }
}


package com.ujjaval.ecommerce.commondataservice.service;

import com.ujjaval.ecommerce.commondataservice.dao.sql.categories.*;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.BrandImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.CarouselImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.ApparelImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.info.*;
import com.ujjaval.ecommerce.commondataservice.dto.*;
import com.ujjaval.ecommerce.commondataservice.entity.sql.categories.GenderCategory;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.BrandImages;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.CarouselImages;
import com.ujjaval.ecommerce.commondataservice.entity.sql.images.ApparelImages;
import com.ujjaval.ecommerce.commondataservice.entity.sql.info.ProductInfo;
import com.ujjaval.ecommerce.commondataservice.model.FilterAttributesResponse;
import com.ujjaval.ecommerce.commondataservice.model.HomeTabsDataResponse;
import com.ujjaval.ecommerce.commondataservice.model.MainScreenResponse;
import com.ujjaval.ecommerce.commondataservice.model.SearchSuggestionResponse;
import com.ujjaval.ecommerce.commondataservice.service.interfaces.CommonDataService;
import org.javatuples.Pair;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.*;

@Service
public class CommonDataServiceImpl implements CommonDataService {

    @Autowired
    private ProductInfoRepository productInfoRepository;

    @Autowired
    private OrderInfoRepository orderInfoRepository;

    @Autowired
    private AddressInfoRepository addressInfoRepository;

    @Autowired
    private BankInfoRepository bankInfoRepository;

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Autowired
    private GenderCategoryRepository genderCategoryRepository;

    @Autowired
    private ApparelCategoryRepository apparelCategoryRepository;

    @Autowired
    private ProductBrandCategoryRepository productBrandCategoryRepository;

    @Autowired
    private BrandImagesRepository brandImagesRepository;

    @Autowired
    private ApparelImagesRepository apparelImagesRepository;

    @Autowired
    private CarouselImagesRepository carouselImagesRepository;

    @Autowired
    private SortByCategoryRepository sortByCategoryRepository;

    @Autowired
    private PriceRangeCategoryRepository priceRangeCategoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    private HashMap<String, Pair<String, String>> searchSuggestionMap;

    private final String PRODUCT_QUERY_URI = "/products?q=";

    public ProductInfo findAddressById(Integer id) {
        Optional<ProductInfo> result = productInfoRepository.findById(id);

        ProductInfo productInfo;

        if (result.isPresent()) {
            productInfo = result.get();
        } else {
            throw new RuntimeException("Address Id is not present " + id);
        }

        return productInfo;
    }

    public void save() {
//        AddressInfo addressInfo1 = new AddressInfo("2600 bay area blvd.", "Apt. 304", "77058", "Tx", "USA");
//        ContactInfo contactInfo = new ContactInfo("jmiller@gmail.com", "534636453", "345345353", null);
//        BankInfo bankInfo1 = new BankInfo("john", "miller", "Chase bank", "34345834", "0003424653");
//        BankInfo bankInfo2 = new BankInfo("john", "Filler", "Chase bank", "34345834", "0003424653");
//        bankInfo1.setAddressInfo(addressInfo1);
//        bankInfo1.setContactInfo(contactInfo);
//        bankInfo2.setContactInfo(contactInfo);
//        addressInfoRepository.save(addressInfo1);
//        contactInfoRepository.save(contactInfo);
//        bankInfoRepository.save(bankInfo1);
//        bankInfoRepository.save(bankInfo2);


//        ProductMainCategoryInfo productMainCategoryInfo = new ProductMainCategoryInfo("Category1");
//        ProductSubCategoryInfo productSubCategoryInfo = new ProductSubCategoryInfo("SubCategory1");
//        ProductBrandInfo productBrandInfo = new ProductBrandInfo("Brand1");
//
//        ProductInfo productInfo = new ProductInfo(123, "product1", "312423", productBrandInfo,
//                productMainCategoryInfo, productSubCategoryInfo, 34.23, 3, 4, (float) 3.4,
//                false, "image.jpg", null);
//
//        productBrandInfoRepository.save(productBrandInfo);
//        productSubCategoryInfoRepository.save(productSubCategoryInfo);
//        productMainCategoryInfoRepository.save(productMainCategoryInfo);
//        productInfoRepository.save(productInfo);

    }

    private HashMap<String, String> getConditionMapFromQuery(String queryParams) {
        // append :: at the end so that we can split even if there is just one condition
        // for eg ?q=brand=1::
        queryParams = queryParams.concat("::");
        String[] separatedConditions = queryParams.split("::");

        if (separatedConditions.length > 0) {
            HashMap<String, String> conditionMap = new HashMap<>();
            for (String condition : separatedConditions) {
                String[] categories = condition.split("=");
                if (categories.length > 1) {
                    conditionMap.put(categories[0], categories[1]);
                }
            }
            return conditionMap;
        }
        return null;
    }

    @Cacheable(key = "#apiName" , value = "mainScreenResponse")
    public MainScreenResponse getHomeScreenData(String apiName) {

        List<BrandImages> brandList = brandImagesRepository.getAllData();
        Type listType = new TypeToken<List<BrandImagesDTO>>() {
        }.getType();
        List<BrandImagesDTO> brandDTOList = modelMapper.map(brandList, listType);

        List<ApparelImages> apparelList = apparelImagesRepository.getAllData();
        listType = new TypeToken<List<ApparelImagesDTO>>() {
        }.getType();
        List<ApparelImagesDTO> apparelDTOList = modelMapper.map(apparelList, listType);

        List<CarouselImages> carouselList = carouselImagesRepository.getAllData();

        return new MainScreenResponse(brandDTOList, apparelDTOList, carouselList);
    }

    @Cacheable(key = "#queryParams" , value = "filterAttributesResponse")
    public FilterAttributesResponse getFilterAttributesByProducts(String queryParams) {
        HashMap<String, String> conditionMap = getConditionMapFromQuery(queryParams);

        if (conditionMap != null && !conditionMap.isEmpty()) {
            FilterAttributesResponse filterAttributesResponse = productInfoRepository.getFilterAttributesByProducts(conditionMap);
            filterAttributesResponse.setSorts(sortByCategoryRepository.getAllData());
            return filterAttributesResponse;
        }
        return null;
    }

    @Cacheable(key = "#queryParams", value = "productInfoDTO")
    public ProductInfoDTO getProductsByCategories(String queryParams) {

        HashMap<String, String> conditionMap = getConditionMapFromQuery(queryParams);
        ProductInfoDTO productInfoDTO = null;

        if (conditionMap != null && !conditionMap.isEmpty()) {
            Pair<Long, List<ProductInfo>> result = productInfoRepository.getProductsByCategories(conditionMap);
            if (result != null) {
                productInfoDTO = new ProductInfoDTO(result.getValue0(), result.getValue1());

            }
        }
        return productInfoDTO;
    }

    @Cacheable(key = "#queryParams", value = "hashMap")
    public HashMap<Integer, ProductInfo> getProductsById(String queryParams) {

        String[] productIds = queryParams.split(",");
        HashMap<Integer, ProductInfo> resultMap = null;

        if (productIds.length > 0) {
            List<ProductInfo> result = productInfoRepository.getProductsById(productIds);

            if (result != null) {
                resultMap = new HashMap<>();
                for (ProductInfo info : result) {
                    resultMap.put(info.getId(), info);
                }
            }
        }

        return resultMap;
    }

    @Cacheable(key = "#apiName" , value = "homeTabsDataResponse")
    public HomeTabsDataResponse getBrandsAndApparelsByGender(String apiName) {
       return productInfoRepository.getBrandsAndApparelsByGender();
    }

    private void constructAndAppendSearchSuggestion(String attr1_Name, String attr2_Name,
                                                    List<SearchSuggestionForTwoAttrDTO> searchSuggestionList,
                                                    List<SearchSuggestionResponse> searchSuggestionResponseList) {

        if (searchSuggestionList == null) {
            return;
        }

        for (SearchSuggestionForTwoAttrDTO searchSuggestion : searchSuggestionList) {
            StringJoiner title = new StringJoiner(" ");
            title.add(searchSuggestion.getAttr1_Name());
            title.add(searchSuggestion.getAttr2_Name());

            StringBuilder link = new StringBuilder(PRODUCT_QUERY_URI);
            link.append(attr1_Name).append("=").append(searchSuggestion.getAttr1_Id());
            link.append("::").append(attr2_Name).append("=").append(searchSuggestion.getAttr2_Id());
            searchSuggestionResponseList.add(new SearchSuggestionResponse(title, link));
        }
    }

    public List<SearchSuggestionResponse> getSearchSuggestionList() {

        List<SearchSuggestionForThreeAttrDTO> searchSuggestionForThreeAttrDTOList =
                productInfoRepository.getSearchSuggestionListForThreeAttr();
        List<SearchSuggestionResponse> searchSuggestionResponseList = new LinkedList<>();

        List<GenderCategory> genderCategoryList = genderCategoryRepository.getAllData();

//        for (GenderCategory genderCategory: genderCategoryList) {
//
//        }


        constructAndAppendSearchSuggestion("genders", "apparels",
                productInfoRepository.getSearchSuggestionListForGenderAndApparel(),
                searchSuggestionResponseList);

        constructAndAppendSearchSuggestion("genders", "brands",
                productInfoRepository.getSearchSuggestionListForGenderAndBrand(),
                searchSuggestionResponseList);

        constructAndAppendSearchSuggestion("apparels", "brands",
                productInfoRepository.getSearchSuggestionListForApparelAndBrand(),
                searchSuggestionResponseList);

        for (SearchSuggestionForThreeAttrDTO searchSuggestionForThreeAttrDTO : searchSuggestionForThreeAttrDTOList) {
            StringJoiner title = new StringJoiner(" ");
            title.add(searchSuggestionForThreeAttrDTO.getGenderName());
            title.add(searchSuggestionForThreeAttrDTO.getApparelName());
            title.add(searchSuggestionForThreeAttrDTO.getBrandName());

            StringBuilder link = new StringBuilder(PRODUCT_QUERY_URI);
            link.append("genders=").append(searchSuggestionForThreeAttrDTO.getGenderId());
            link.append("::apparels=").append(searchSuggestionForThreeAttrDTO.getApparelId());
            link.append("::brands=").append(searchSuggestionForThreeAttrDTO.getBrandId());
            searchSuggestionResponseList.add(new SearchSuggestionResponse(title, link));
        }


        return searchSuggestionResponseList;
    }


}

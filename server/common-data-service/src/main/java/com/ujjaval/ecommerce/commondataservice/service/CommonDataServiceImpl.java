package com.ujjaval.ecommerce.commondataservice.service;

import com.ujjaval.ecommerce.commondataservice.dao.sql.categories.*;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.BrandImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.CarouselImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.images.ApparelImagesRepository;
import com.ujjaval.ecommerce.commondataservice.dao.sql.info.*;
import com.ujjaval.ecommerce.commondataservice.dto.BrandImagesDTO;
import com.ujjaval.ecommerce.commondataservice.dto.ApparelImagesDTO;
import com.ujjaval.ecommerce.commondataservice.dto.SearchSuggestionForThreeAttrDTO;
import com.ujjaval.ecommerce.commondataservice.dto.SearchSuggestionForTwoAttrDTO;
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
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.net.UnknownHostException;
import java.util.*;

@Service
public class CommonDataServiceImpl implements CommonDataService {

    @Autowired
    Environment environment;

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

//    public String appendHostUrl(String path) throws UnknownHostException {
//        return String.format("http://localhost:%s/web-images/%s", environment.getProperty("local.server.port"), path);
//    }

    public MainScreenResponse getHomeScreenData() throws UnknownHostException {

        List<BrandImages> brandList = brandImagesRepository.getAllData();
        Type listType = new TypeToken<List<BrandImagesDTO>>() {
        }.getType();
        List<BrandImagesDTO> brandDTOList = modelMapper.map(brandList, listType);
//        for (BrandImagesDTO info : brandDTOList) {
//            info.setFilePath(appendHostUrl(info.getFilePath()));
//        }

        List<ApparelImages> apparelList = apparelImagesRepository.getAllData();
        listType = new TypeToken<List<ApparelImagesDTO>>() {
        }.getType();
        List<ApparelImagesDTO> apparelDTOList = modelMapper.map(apparelList, listType);
//        for (ApparelImagesDTO info : apparelDTOList) {
//            info.setFilePath(appendHostUrl(info.getFilePath()));
//        }

        List<CarouselImages> carouselList = carouselImagesRepository.getAllData();
//        for (CarouselImages info : carouselList) {
//            info.setFilePath(appendHostUrl(info.getFilePath()));
//        }

        return new MainScreenResponse(brandDTOList, apparelDTOList, carouselList);
    }

    public FilterAttributesResponse getFilterAttributesByProducts(HashMap<String, String> conditionMap) {
        FilterAttributesResponse filterAttributesResponse = productInfoRepository.getFilterAttributesByProducts(conditionMap);
        filterAttributesResponse.setSorts(sortByCategoryRepository.getAllData());
        return filterAttributesResponse;
    }

    public Pair<Long, List<ProductInfo>> getProductsByCategories(HashMap<String, String> conditionMap)
            throws UnknownHostException {

//        if (result != null) {
//            for (ProductInfo info : result.getValue1()) {
//                info.setImageName(appendHostUrl(info.getImageName()));
//            }
//        }
        return productInfoRepository.getProductsByCategories(conditionMap);
    }

    public HashMap<Integer, ProductInfo> getProductsById(String[] productIds) throws UnknownHostException {
        List<ProductInfo> result = productInfoRepository.getProductsById(productIds);

        HashMap<Integer, ProductInfo> resultMap = null;

        if (result != null) {
            resultMap = new HashMap<>();
            for (ProductInfo info : result) {
//                info.setImageName(appendHostUrl(info.getImageName()));
                resultMap.put(info.getId(), info);
            }
        }

        return resultMap;
    }

    public HomeTabsDataResponse getBrandsAndApparelsByGender() {
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

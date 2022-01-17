import { createStore } from 'vuex'

const store = createStore({
    state: {
        appName: 'Vue Transfers',
        clientID:'122070',
        target:'Test',
        availURL:'https://otageo.cartrawler.com/cartrawlerota/json?type=OTA_GroundAvailRQ',
        testAvailURL:'https://external-dev.cartrawler.com/cartrawlerota/json?type=OTA_GroundAvailRQ',
        bookURL:'https://ct-demos.com/gt-book.php?env=Production',
        testBookURL:'"http://localhost:8888/cartrawler/gt-book.php?env=Test"',
        retrieveURL:'https://otageo.cartrawler.com/cartrawlerota/json?type=OTA_GroundResRetrieveRQ',
        testRetrieveURL:'https://external-dev.cartrawler.com/cartrawlerota/json?type=OTA_GroundResRetrieveRQ',
        cancelURL:'https://otageo.cartrawler.com/cartrawlerota/json?type=OTA_GroundCancelRQ',
        testCancelURL:'https://external-dev.cartrawler.com/cartrawlerota/json?type=OTA_GroundCancelRQ',
        currency:'EUR',
        language:'en',
        residency:'IE',
        transfers: [],
        selectedTransfer: null,
        searchData:null,
        passengerInformation:{},
    },
    actions:{},
    mutations: {
        setSelectedTransfer(state, transfer){
            state.selectedTransfer = transfer;
        },
        updateSearchData(state, data){
            //Clean some data before commiting it
            data.dropOffAddress = decodeURI(data.dropOffAddress);
            data.oneWay = (data.returnDate != undefined)?false:true;
            state.searchData = data;
        }
    },
    getters: {
        selectedTransfer(state){
            return state.selectedTransfer;
        },
        searchData(state){
            return state.searchData;
        },
        clientID: (state) => {
            return state.clientID;
        },
        target: (state) => {
            return state.target;
        },
        availURL: (state) => {
            return (state.target === "Production")?state.availURL:state.testAvailURL;
        },
        bookURL: (state) => {
            return (state.target === "Production")?state.bookURL:testBookURL;
        },
        retrieveURL: (state) => {
            return (state.target === "Production")?state.retrieveURL:state.testRetrieveURL;
        },
        cancelURL: (state) => {
            return (state.target === "Production")?state.cancelURL:state.testCancelURL;
        },
        currency: (state) => {
            return state.currency;
        },
        language: (state) => {
            return state.language;
        },
        residency: (state) => {
            return state.residency;
        },
        appName: (state) => {
            return state.appName;
        }
      }
  });

  export default store
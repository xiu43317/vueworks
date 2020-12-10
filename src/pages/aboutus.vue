<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
           <a class="navbar-brand" href="#">Open1999</a>
        <div class="form-inline">
         <div class="form-group mb-2">
          <div class="form-inline my-2 my-lg-0">
            <label for="searchRegion">搜尋地區：</label>
            <select id="searchRegion" class="form-control mr-sm-2" v-model="searchRegion">
              <option value='all'>全部</option>
              <option v-for="(option,index) in regionOption" :value="option" :key="index">
                {{ option }}
              </option>
            </select>
          </div>
            <input
              type="text"
              class="form-control mr-sm-2"
              placeholder="Search"
              v-model="searchKeyword"
              @keyup="handleWorkSearch">
          </div>

        </div>

        <ul class="nav navbar-nav navbar-right">
          <li class="nav-item">
            <a class="nav-link hidden-xs-down" target="_blank" href="http://data.kcg.gov.tw/dataset/open1999">資料出處：data.kcg.gov.tw</a>
          </li>
        </ul>
      </div>
    </nav>

    <hr>
<!-- if -->
    <div v-if="opendate.length===0" class="alert alert-info" role="alert">
      很抱歉！找不要您到的資訊。
    </div>
<!-- else
      除了使用"!" <div v-if="!opendate.length===0">
      判斷反向數值之外，Vue 2.1 有 v-else, v-else-if directive 可以方便使用
    -->
    <div v-else>
      <div class="alert alert-success" role="alert">
        總共查到：{{ opendate.length }} 筆資料。
      </div>
      <!-- card -->
      <div class="row">
        <div class="col-md-4 col-sm-6" v-for="(item,index) in opendate" :key="index">
          <div class="img-thumbnail">
            <span class="label bg-warning text-light">{{ item.ZipName_ }}</span>
            <span class="label bg-info text-light">{{ item.UnitName_ }}</span><br>
            <span class="label label-ligth-pink text-light">{{ item.InformDesc_ }}</span> 
            <div class="caption">
              <h3>
                <a :href="getGoogleMap( item.address_ )" target="_blank">{{ item.address_ }}</a>
              </h3>
              <p>{{ item.BeforeDesc_ }}</p>
              <small class="text-muted">反應日期：{{ item.Cre_Date_ }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
<!-- end eles -->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchRegion: 'all',
      searchKeyword: '',
    };
  },
  created() {
    // created Hook 發出 action call API
    this.$store.dispatch('open1999');
    this.$store.dispatch('opendataSearchKeyword', this.searchKeyword);
    this.$store.dispatch('opendataSearchRegion', this.searchRegion);
  },
  computed: mapGetters({
    opendate: 'getOpen1999',
    regionOption: 'getRegionOption',
  }),
  methods: {
    ...mapActions([
    ]),
    getGoogleMap(address) {
      // Template literals
      // ${裡面可以放變數}
      // ES5: "https://www.google.com/maps/place/" + address;
      return `https://www.google.com/maps/place/${address}`;
    },
    handleWorkSearch() {
      this.$store.dispatch('opendataSearchKeyword', this.searchKeyword);
    },
  },
  /*
    當 select 改變時，會雙向綁定 option value
    因此我們監聽 `searchRegion`（預設是 all）
    將改變的 value 發出 action 改變 state
    state 改變 getter 將會重新計算，因此我們得到新的搜尋結果。
  */
  watch: {
    searchRegion(val) {
      // val 是 searchRegion 的 value（打開下面 console 試試看）
      // cosole.log('watch searchRegion?', searchRegion);
      this.$store.dispatch('opendataSearchRegion', val);
    },
  },
};
</script>

<style>
  .img-thumbnail {
      text-align: left;
}
  .img-thumbnail h3 {
    margin-top: 7px;
  }
  .label-ligth-pink {
    background-color: #f68a8a;
  }
  .img-thumbnail p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;/*（行數） */
    -webkit-box-orient: vertical;
  }
</style>

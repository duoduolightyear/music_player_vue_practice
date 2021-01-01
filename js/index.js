/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
    el: '#player',
    data: {
        //搜索
        query: '',
        //歌曲列表
        musicList: [],
        //歌曲地址
        musicUrl: '',
        // 歌曲封面
        musicCover: '',
        // 歌曲评论
        hotComments: [],
        //MV地址
        mvUrl: '',
        //MV显示
        showVideo: false,
        //歌曲播放
        isPlaying: false,
    },
    methods: {
        //搜索
        searchMusic: function () {
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(response => {
                    this.musicList = response.data.result.songs;
                })
                .catch(err => console.log(err))
        },
        //歌曲播放
        playMusic: function (id) {
            //播放
            axios.get('https://autumnfish.cn/song/url?id=' + id)
                .then(response => {
                    this.musicUrl = response.data.data[0].url

                })
                .catch(err => console.log(err))

            //歌曲封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + id)
                .then(response => {
                    this.musicCover = response.data.songs[0].al.picUrl;
                })
                .catch(err => console.log(err))

            //歌曲评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + id)
                .then(response => {
                    this.hotComments = response.data.hotComments;
                })
                .catch(err => console.log(err))
        },
        //暂停
        pause: function() {
            this.isPlaying = false;
        },
        //播放
        play: function() {
            this.isPlaying = true;
        },
        //MV播放
        playMV: function(mvid) {
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid) 
            .then(response => {
                this.showVideo = true;
                this.mvUrl = response.data.data.url;
            })
            .catch(err => console.log(err))
        },
        //MV关闭
        closeMV: function() {
            this.showVideo = false;
        } 
    }
})
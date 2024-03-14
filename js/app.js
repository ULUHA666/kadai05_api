// script.js

// 現在位置の取得
navigator.geolocation.getCurrentPosition(success, fail);

// 現在位置が取得できた場合
function success(pos) {
    const latitude = pos.coords.latitude; //緯度
    const longitude = pos.coords.longitude; // 経度
    const url = 'https://api.openweathermap.org/data/2.5/forecast'; // 使用するAPIのurl
    const apiKey = '8e7163df3a4123670ee70f11db141a49';

    // 非同期処理
    $.ajax({
        url: url, // 使用するAPIのURL
        data: { // 取得に必要な情報
            appid: apiKey,
            lat: latitude,
            lon: longitude,
            cnt: 8, // 取得する数
            units: 'metric', // 摂氏
            lang: 'ja' // 言語
        }
    })

        // API通信成功時
        .done(function (data) {
            console.log(data);

            $('h2').text(data.city.country + '：' + data.city.name + 'の天気');

            data.list.forEach(function (response, index) {

                const dateTime = new Date(response.dt * 1000); // 取得日時
                const month = dateTime.getMonth() + 1; // 月
                const date = dateTime.getDate(); // 日
                const time = dateTime.getHours(); // 時間
                const temp = Math.round(response.main.temp); // 気温
                const description = response.weather[0].description; // 天気の詳細
                const icon = response.weather[0].icon; // 天気アイコン名

                $('#' + index + '_icon').children('img').attr
                    ('src', 'http://openweathermap.org/img/wn/' + icon + '@4x.png'); // 天気アイコンの場所
                $('#' + index + '_time').text('日付：' + month + '月' + date + '日' + '　' + time + ':00'); // 取得した月日
                $('#' + index + '_description').text('天気：' + description); // 天気の詳細
                $('#' + index + '_temp').text('気温：' + temp + '°C'); // 気温

            });
        })
        // APIとの通信が失敗した場合
        .fail(function () {
            alert('APIから情報を取得できませんでした。');
        })
}

// 現在位置が取得できなかった場合
function fail(error) {
    alert('現在位置を取得できませんでした。');
}

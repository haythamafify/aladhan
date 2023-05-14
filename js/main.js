
// declare 
let cityselect = document.getElementById("city-select");
const citiesInEgypt = [
  {
    ar: "القاهرة",
    en: "Cairo",
  },
  {
    ar: "الإسكندرية",
    en: "Alexandria",
  },
  {
    ar: "الأقصر",
    en: "Luxor",
  },
  {
    ar: "أسوان",
    en: "Aswan",
  },
  {
    ar: "الجيزة",
    en: "Giza",
  },
  {
    ar: "الفيوم",
    en: "Fayum",
  },
  {
    ar: "الغردقة",
    en: "Hurghada",
  },
  {
    ar: "بور سعيد",
    en: "Port Said",
  },
  {
    ar: "أسيوط",
    en: "Asyut",
  },
  {
    ar: "دمياط",
    en: "Damietta",
  },
  {
    ar: "الإسماعيلية",
    en: "Ismailia",
  },
  {
    ar: "المنيا",
    en: "Minya",
  },
  {
    ar: "طنطا",
    en: "Tanta",
  },
  {
    ar: "بني سويف",
    en: "Beni Suef",
  },
  {
    "ar": "بنها",
    "en": "Banha"
  },
  {
    ar: "الزقازيق",
    en: "Zagazig",
  },
 
  {
    ar: "دمنهور",
    en: "Damanhur",
  },
  {
    ar: "إدفو",
    en: "Edfu",
  },
  {
    ar: "المنصورة",
    en: "Mansoura",
  },
  {
    ar: "المحلة الكبرى",
    en: "El Mahalla El Kubra",
  },
  {
    ar: "شرم الشيخ",
    en: "Sharm El Sheikh",
  },
  {
    ar: "قنا",
    en: "Qena",
  },
  {
    ar: "بنها",
    en: "Banha",
  },
  {
    ar: "السويس",
    en: "Suez",
  },
  {
    ar: "شبين الكوم",
    en: "Shibin El Kom",
  },
  {
    ar: "كفر الشيخ",
    en: "Kafar El Sheikh",
  },
  {
    ar: "العريش",
    en: "Arish",
  },
  {
    ar: "أخميم",
    en: "Akhmim",
  },
  {
    ar: "سوهاج",
    en: "Sohag",
  },
];
fillcites();
getpraytime("Cairo", "Egypte");
function fillcites() {
  cityselect.innerHTML = "";
  for (const iterator of citiesInEgypt) {
    let city = `<option value="${iterator.en}">${iterator.ar} </option>`;
    cityselect.innerHTML += city;
  }
}
cityselect.addEventListener("change", function () {
  let cityar;
  for (const item of citiesInEgypt) {
    if (item.en == this.value) {
     
      cityar = item.ar;
    }
  }

  
  getpraytime(this.value, "Egypte");
  filltimes("current-city", cityar);
});

function getpraytime(city, country) {
  let params = {
    city: city,
    country: country,
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity?", {
      params: params,
    })
    .then(function (response) {
      let timing = response.data.data.timings;
      let timezone = response.data.data.meta.timezone;
      let currentdate = response.data.data.date.readable;
      let currentdatebyname = response.data.data.date.hijri.weekday.ar;
      let fullDate = currentdate + " " + currentdatebyname;
      filltimes("Fajr", timing.Fajr);
      filltimes("Sunrise", timing.Sunrise);
      filltimes("Dhuhr", timing.Dhuhr);
      filltimes("Asr", timing.Asr);
      filltimes("Maghrib", timing.Maghrib);
      filltimes("Isha", timing.Isha);
      // filltimes("current-city", timezone);
      filltimes("full-date", fullDate);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function filltimes(getElementById, timings) {
  document.getElementById(getElementById).innerHTML = timings;
}

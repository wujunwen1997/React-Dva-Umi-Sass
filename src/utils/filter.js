export function timeFormat(time) {
  var d = new Date(time);

  var year = d.getFullYear();       //年
  var month = d.getMonth() + 1;     //月
  var day = d.getDate();            //日

  var hh = d.getHours();            //时
  var mm = d.getMinutes();          //分
  var ss = d.getSeconds();           //秒

  var clock = year + "-";

  if (month < 10)
    clock += "0";

  clock += month + "-";

  if (day < 10)
    clock += "0";

  clock += day + " ";

  if (hh < 10)
    clock += "0";

  clock += hh + ":";
  if (mm < 10) clock += '0';
  clock += mm + ":";

  if (ss < 10) clock += '0';
  clock += ss;
  return (clock);
}

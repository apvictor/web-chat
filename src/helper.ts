export const helper = {
  formatTime: (dateTimestamp: string) => {
    var date = new Date(Number(dateTimestamp) * 1000);
    var hour = date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();

    var formattedTime = hour + ':' + minute.substr(-2) + ':' + second.substr(-2);

    return formattedTime
  },
  formatDate: (dateTimestamp: string) => {
    var date = new Date(Number(dateTimestamp) * 1000);
    var day = "0" + date.getDay();
    var month = "0" + Number(date.getMonth() + 1);
    var year = date.getFullYear();

    var formattedDate = day + '/' + month + '/' + year;

    return formattedDate
  }
}
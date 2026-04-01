const burl = document.URL;
let url = new URL(burl);
let port = url.port;

export let REACT_APP_DASHBOARD_BASE_URL = '';
export let REACT_APP_ADMIN_BASE_URL ='';
export let REACT_APP_ENV = '';

if(port === "3000" || port === "3020")
{
    REACT_APP_DASHBOARD_BASE_URL="http://10.11.20.127:7886/gx-dashboard/v1/api/"
    REACT_APP_ADMIN_BASE_URL="http://10.11.20.127:7884/dashboardadmin/v1/api/"
    REACT_APP_ENV="DEV"
}
else if(port === "3025")
{
    REACT_APP_DASHBOARD_BASE_URL="http://10.11.20.127:7889/gx-dashboard/v1/api/"
    REACT_APP_ADMIN_BASE_URL="http://10.11.20.127:7888/dashboardadmin/v1/api/"
    REACT_APP_ENV="QA"
}
else if(port === "3030")
{
    REACT_APP_DASHBOARD_BASE_URL="http://10.11.20.127:7992/gx-dashboard/v1/api/"
    REACT_APP_ADMIN_BASE_URL="http://10.11.20.127:7991/dashboardadmin/v1/api/"
    REACT_APP_ENV="QA AUTO"
}
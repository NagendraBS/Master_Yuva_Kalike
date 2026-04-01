import axios from "axios";
import { ADMIN_BASE_URL } from "../utils/Config";

export async function getEnterpriseList() {
  return await axios.get(ADMIN_BASE_URL + "getLogin");
}
export async function getRolesList(information) {
   
  const data = {
    lanId: information.lanId,
    enterpriseId: information.enterpriseId
  };
  
  return await axios.post(ADMIN_BASE_URL + "login", data);
}

export async function login(details) {
  const data = {
    lanId: details.lanId,
    password: details.password,
    enterpriseId: details.enterpriseId,
  };
  return await axios.post(ADMIN_BASE_URL + "login", data);
}

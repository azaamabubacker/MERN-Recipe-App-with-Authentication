import jwt_decode from "jwt-decode";

export const useGetUserId = () => {
  const token = localStorage.getItem("jwtToken");
  return jwt_decode(token).id;
};

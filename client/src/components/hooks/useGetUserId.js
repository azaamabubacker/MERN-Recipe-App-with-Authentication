import jwt_decode from "jwt-decode";

export const useGetUserId = () => {
  try {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      return jwt_decode(token).id;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Invalid token specified: ", error);
    return null;
  }
};

// export const useGetUserId = () => {
//   const token = localStorage.getItem("jwtToken");
//   return jwt_decode(token).id;
// };

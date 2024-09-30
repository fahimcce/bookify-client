import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

export const useValidUser = () => {
  const user = useAppSelector(selectCurrentUser);
  if (!user) {
    return false;
  }
  if (user) {
    if (user?.exp < (new Date().getTime() + 1) / 1000) {
      return false;
    }
  }
  return true;
};

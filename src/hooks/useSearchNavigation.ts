import { useRouter } from 'next/navigation'

const useSearchNavigation = (replace = false) => {
  const router = useRouter()
  return (pathname: string, params: any) => {
    const searchParams = new URLSearchParams(params).toString();
    const navigate = replace ? router.replace : router.push;
    navigate(`${pathname}?${searchParams}`);
  };
}

export default useSearchNavigation;
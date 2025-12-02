import { Route } from "@/routes/movie.$movieId"
import { useAppDispatch, useAppSelector } from "@/store"
import { clearDetail, getMovieDetail } from "@/store/slices/moviesSlice"
import { useNavigate, useRouter } from "@tanstack/react-router"
import { useEffect } from "react"

export const useMovieDetailPageImpl = () => {
  const router = useRouter()
  const navigate = useNavigate()

  const { movieId } = Route.useParams()
  const dispatch = useAppDispatch()
  const { movieDetails, isLoadingDetail } = useAppSelector((state) => state.movies)

  useEffect(() => {
    dispatch(clearDetail())

    if (movieId) {
      dispatch(getMovieDetail({ i: movieId }))
    }
  }, [movieId])

  const handleGoBack = () => {
    if (router.history.canGoBack()) {
      router.history.back()
    } else {
      navigate({
        to: "/"
      })
    }
  }

  return {
    movieDetails,
    isLoadingDetail,
    handleGoBack
  }
}
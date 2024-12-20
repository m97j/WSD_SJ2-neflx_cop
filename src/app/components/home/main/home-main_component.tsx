import React, { useState, useEffect } from 'react';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BannerComponent from '../../../views/home_main/banner.component';
import MovieRowComponent from '../../../views/home_main/movie-row.component';
import URLService from '../../../util/movie/URL';
import './home-main.component.css';

const HomeMainComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const apiKey = localStorage.getItem('TMDb-Key') || '';

  const popularMoviesUrl = URLService.getURL4PopularMovies(apiKey);
  const newReleasesUrl = URLService.getURL4ReleaseMovies(apiKey);
  const actionMoviesUrl = URLService.getURL4GenreMovies(apiKey, '28');

  useEffect(() => {
    const loadFeaturedMovie = async () => {
      const movie = await URLService.fetchFeaturedMovie(apiKey);
      setFeaturedMovie(movie);
    };
    loadFeaturedMovie();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [apiKey]);

  return (
    <div className="home">
      <BannerComponent movie={featuredMovie} />
      <MovieRowComponent title="인기 영화" fetchUrl={popularMoviesUrl} />
      <MovieRowComponent title="최신 영화" fetchUrl={newReleasesUrl} />
      <MovieRowComponent title="액션 영화" fetchUrl={actionMoviesUrl} />
    </div>
  );
};


export default HomeMainComponent;

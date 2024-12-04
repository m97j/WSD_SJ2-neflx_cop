import React, { useState } from 'react';
import { SearchOptions } from '../../../models/types';
import './movie-search.component.css';

type DropdownKey = 'originalLanguage' | 'translationLanguage' | 'sorting';

interface MovieSearchComponentProps {
  changeOptions: (options: SearchOptions) => void;
}

const MovieSearchComponent: React.FC<MovieSearchComponentProps> = ({ changeOptions }) => {
  const dropdowns: Record<DropdownKey, string[]> = {
    originalLanguage: ['장르 (전체)', 'Action', 'Adventure', 'Comedy', 'Crime', 'Family'],
    translationLanguage: ['평점 (전체)', '9~10', '8~9', '7~8', '6~7', '5~6', '4~5', '4점 이하'],
    sorting: ['언어 (전체)', '영어', '한국어']
  };

  const DEFAULT_OPTIONS: SearchOptions = {
    originalLanguage: '장르 (전체)',
    translationLanguage: '평점 (전체)',
    sorting: '언어 (전체)'
  };

  const [selectedOptions, setSelectedOptions] = useState<SearchOptions>({ ...DEFAULT_OPTIONS });
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);

  const dropdownEntries = Object.entries(dropdowns).map(([key, options]) => ({
    key: key as DropdownKey,
    options
  }));

  const toggleDropdown = (key: DropdownKey): void => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const selectOption = (key: DropdownKey, option: string): void => {
    const newOptions = {
      ...selectedOptions,
      [key]: option
    };
    setSelectedOptions(newOptions);
    setActiveDropdown(null);
    changeOptions(newOptions);
  };

  const clearOptions = (): void => {
    setSelectedOptions({ ...DEFAULT_OPTIONS });
    changeOptions(DEFAULT_OPTIONS);
  };

  return (
    <div className="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      {dropdownEntries.map(({ key, options }) => (
        <div key={key} className="custom-select">
          <div className="select-selected" onClick={() => toggleDropdown(key)}>
            {selectedOptions[key]}
          </div>
          {activeDropdown === key && (
            <div className="select-items">
              {options.map(option => (
                <div key={option} onClick={() => selectOption(key, option)}>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button className="clear-options" onClick={clearOptions}>초기화</button>
    </div>
  );
};

export default MovieSearchComponent;

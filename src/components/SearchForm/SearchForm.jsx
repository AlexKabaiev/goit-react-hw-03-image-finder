import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchForm.module.css';

class SearchForm extends Component {
  state = {
    search: '',
  };
  onSearchInput = e => {
    const value = e.currentTarget.value;
    this.setState({ search: value });
  };
  render() {
    const { submitFn } = this.props;
    const { search } = this.state;
    return (
      <form
        className={css.searchForm}
        onSubmit={e => {
          e.preventDefault();
          submitFn(search);
        }}
      >
        <button type="submit" className={css.searchFormButton}>
          <span className={css.searchFormLabel}>Search</span>
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          value={this.state.search}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={this.onSearchInput}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  submitFn: PropTypes.func.isRequired,
};

export default SearchForm;
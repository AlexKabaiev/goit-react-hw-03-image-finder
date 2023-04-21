import React, { Component } from 'react';
import css from './App.module.css';
import { searchImages } from './api/API';
import Searchbar from './components/Searchbar';
import SearchForm from './components/SearchForm';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

class App extends Component {
  state = {
    items: [],
    search: null,
    loading: false,
    modalActive: false,
    page: 1,
    endOfList: false,
    error: '',
    modalImageSrc: '',
  };
  dataCatcher = search => {
    this.setState({
      search,
      items: [],
      page: 1,
    });
  };
  pageUpdate = () =>
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  openModal = src => {
    this.setState({
      modalActive: true,
      modalImageSrc: src,
    });
  };
  closeModal = () => {
    this.setState({ modalActive: false, modalImageSrc: '' });
  };
  componentDidUpdate(prevProps, prevState) {
    const { page, search } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      searchImages(search, page)
        .then(({ hits }) => {
          this.setState(({ items }) => ({ items: [...items, ...hits] }));
          if (hits.length < 12) {
            this.setState({ endOfList: true });
          }
        })
        .catch(erorr => this.setState({ erorr: erorr.message }))
        .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { items, loading, endOfList, modalActive, modalImageSrc } =
      this.state;
    const { dataCatcher, pageUpdate, openModal, closeModal } = this;
    return (
      <div className={css.App}>
        <Searchbar>
          <SearchForm submitFn={dataCatcher} />
        </Searchbar>
        <ImageGallery>
          <ImageGalleryItem hits={items} clicked={openModal} />
        </ImageGallery>
        {loading && <Loader />}
        {Boolean(items.length) && !endOfList && (
          <Button loadMore={pageUpdate} />
        )}
        {modalActive && <Modal url={modalImageSrc} close={closeModal} />}
      </div>
    );
  }
}
export default App;

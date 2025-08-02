'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

export default function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  });
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [cardTypes, setCardTypes] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCardTypes();
  }, []);

  useEffect(() => {
    fetchCards();
  }, [pagination.currentPage, search, selectedType, sortBy, sortOrder]);

  const fetchCardTypes = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${apiUrl}/api/cards/types`);
      setCardTypes(response.data);
    } catch (error) {
      console.error('Error fetching card types:', error);
    }
  };

  const fetchCards = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        search,
        cardType: selectedType,
        sortBy,
        sortOrder
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      console.log('API URL:', apiUrl);
      console.log('Making request to:', `${apiUrl}/api/cards`);
      
      const response = await axios.get(`${apiUrl}/api/cards`, { params });
      console.log('Response received:', response.data);
      setCards(response.data.cards);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching the card data:', error);
      console.error('Error details:', error.response?.data, error.response?.status);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold text-center">Card Database</h1>
        
        {/* Debug info */}
        <div className="bg-gray-100 p-4 rounded text-sm">
          <p><strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-4 justify-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleTypeChange('')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              All Types
            </button>
            {cardTypes.map(type => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => handleSortChange('name')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'name' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('fortitude')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'fortitude' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Fortitude {sortBy === 'fortitude' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('damage')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'damage' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Damage {sortBy === 'damage' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
            <button
              onClick={() => handleSortChange('collectorNumber')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sortBy === 'collectorNumber' ? 'bg-gray-800 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Card # {sortBy === 'collectorNumber' && (sortOrder === 'asc' ? '↑' : '↓')}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="mb-4 text-center text-gray-600">
            Showing {cards.length} of {pagination.totalItems} cards
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map(card => (
              <Card key={card._id} card={card} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {[...Array(pagination.totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === pagination.totalPages ||
                    (page >= pagination.currentPage - 2 && page <= pagination.currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          page === pagination.currentPage
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === pagination.currentPage - 3 ||
                    page === pagination.currentPage + 3
                  ) {
                    return <span key={page} className="px-2 py-2">...</span>;
                  }
                  return null;
                })}
              </div>
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
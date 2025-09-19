import { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/ProductStore';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchProducts, setSearchQuery, setSortOrder } from './redux/ProductSlice';
import ProductCard from './components/ProductCard';

const ProductsPageContent = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error, searchQuery, sortOrder } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchQuery, sortOrder]);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleSortChange = (value: 'asc' | 'desc' | 'none') => {
    dispatch(setSortOrder(value));
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="w-16 h-16 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error al cargar productos</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchProducts())}
            className="bg-black text-white px-6 py-2.5 rounded-2xl font-medium hover:bg-gray-800 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-black">
                Shopee
              </h1>
            </div>

            <div className="flex-1 max-w-3xl">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar productos, marcas y más..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 transition-all duration-200 text-gray-900 placeholder:text-gray-500 text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="relative flex-shrink-0">
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc' | 'none')}
                  className="appearance-none h-12 bg-white border-2 border-gray-200 rounded-xl px-4 pr-10 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 text-gray-900 cursor-pointer text-sm font-medium hover:border-gray-300 transition-all duration-200 min-w-[180px]"
                >
                  <option value="none">Ordenar por precio</option>
                  <option value="asc">Menor a Mayor</option>
                  <option value="desc">Mayor a Menor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Uswr */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-11 h-11 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center hover:from-gray-200 hover:to-gray-300 transition-all duration-200 cursor-pointer shadow-sm">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Productos</h2>
          <p className="text-gray-600">
            {loading ? 'Cargando productos...' : (
              <>
                {filteredAndSortedProducts.length} producto{filteredAndSortedProducts.length !== 1 ? 's' : ''} encontrado{filteredAndSortedProducts.length !== 1 ? 's' : ''}
                {searchQuery && ` para "${searchQuery}"`}
              </>
            )}
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-0 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                    <div className="h-10 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredAndSortedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && filteredAndSortedProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600">Intenta con otros términos de búsqueda</p>
          </div>
        )}
      </main>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <Provider store={store}>
      <ProductsPageContent />
    </Provider>
  );
};

export default ProductsPage;
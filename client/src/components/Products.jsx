import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Product from './Product';
import { useState } from 'react';

export default function Products() {
  const { isPending, data, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: ({ signal }) =>
      axios.get('/api/products', { signal }).then((res) => res.data),
    retry: 0,
  });

  const [text, setText] = useState('');

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>{error.response.data.msg || error.message}</span>;

  const filteredProducts =
    text.trim().length > 2
      ? data?.data.filter((p) => {
          return p.title.toLowerCase().includes(text.toLowerCase());
        })
      : data?.data;

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">
            Explore Our Products
          </h1>

          <div className="text-center my-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Serach products..."
              className="p-4 border rounded border-gray-900 w-96 outline-none text-xl font-thin"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
}

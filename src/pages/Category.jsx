import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

const Category = () => {
  const [catData, setCatData] = useState([]);
  const {categoryName} = useParams();
  console.log(categoryName);

  const breadcrumbs = useBreadcrumbs();
  console.log(breadcrumbs);

  const {isLoading, error} = useQuery({
    queryKey: ["products"],
    queryFn: () => {
        axios.get(`https://fakestoreapi.com/products/category/${categoryName}`).then(res => setCatData(res.data));
        return data;
    },
    // staleTime: 1000 * 60 * 5    // the data will refetch only after 5 mins even if the page changes...
  })
  console.log(catData);
  return (
    <div>
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </div>
  )
}

export default Category
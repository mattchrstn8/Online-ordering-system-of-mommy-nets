import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const WeekInSalesReport = () => {
  const router = useRouter();
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [averageSale, setAverageSale] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/sales/week');
        setSalesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      salesData.forEach((sale) => {
        total += sale.amount;
      });
      setTotalSales(total);
    };
    calculateTotal();
  }, [salesData]);

  useEffect(() => {
    const calculateAverage = () => {
      setAverageSale(totalSales / salesData.length);
    };
    calculateAverage();
  }, [totalSales]);

  return (
    <div>
      <h1>Week in Sales Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.date}</td>
              <td>{sale.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Sales: {totalSales}</p>
      <p>Average Sale: {averageSale}</p>
    </div>
  );
};

export default WeekInSalesReport;

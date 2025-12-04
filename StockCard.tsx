
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Stock } from '../types';
import { useLanguage } from '../index';

interface StockCardProps {
  stock: Stock;
  onBuy: (stock: Stock) => void;
  onSell: (stock: Stock) => void;
}

export const StockCard: React.FC<StockCardProps> = ({ stock, onBuy, onSell }) => {
  const { t } = useLanguage();
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{stock.symbol}</h3>
          <p className="text-gray-500 text-sm">{stock.name}</p>
        </div>
        <div className={`flex items-center gap-1 font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{stock.change > 0 ? '+' : ''}{stock.change}%</span>
        </div>
      </div>
      
      <div className="text-3xl font-bold text-gray-900 mb-6">
        ${stock.price.toFixed(2)}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onBuy(stock)}
          className="bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
        >
          {t('btn_buy')}
        </button>
        <button 
          onClick={() => onSell(stock)}
          className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors shadow-sm"
        >
          {t('btn_sell')}
        </button>
      </div>
    </div>
  );
};

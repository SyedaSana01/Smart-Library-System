import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Expense } from '../store';

export const exportToExcel = (expenses: Expense[]) => {
  const worksheet = XLSX.utils.json_to_sheet(expenses);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');
  XLSX.writeFile(workbook, 'expenses.xlsx');
};

export const exportToPDF = (expenses: Expense[]) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text('Expense Report', 20, 20);
  
  const headers = ['Date', 'Category', 'Amount', 'Description'];
  const data = expenses.map(expense => [
    expense.date,
    expense.category,
    `$${expense.amount}`,
    expense.description
  ]);
  
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 30,
  });
  
  doc.save('expenses.pdf');
};
window.addEventListener("load", solve);

function solve() {
  const publishBtn = document.getElementById('publish');
  const tbody = document.getElementById('table-body');
  const carsList = document.getElementById('cars-list');
  const profit = document.getElementById('profit')

  const inputs = {
    make: document.getElementById('make'),
    model: document.getElementById('model'),
    year: document.getElementById('year'),
    fuel: document.getElementById('fuel'),
    originalCost: document.getElementById('original-cost'),
    sellingPrice: document.getElementById('selling-price'),
  }

  publishBtn.addEventListener('click', onClickPublich);

  function onClickPublich(e) {
    const make = inputs.make.value;
    const model = inputs.model.value;
    const year = inputs.year.value;
    const fuel = inputs.fuel.value;
    const originalCost = inputs.originalCost.value;
    const sellingPrice = inputs.sellingPrice.value;
    
    e.preventDefault();

    for (const key in inputs) {
        if(inputs[key].value == "") {
          console.log('idealno')
          return;
        }        
      
    }

    if (originalCost > sellingPrice) {
      return;
    }
    
    const tr = document.createElement('tr');

    function createElement(elementToCreate, content, classToAdd) {
      const newOne = document.createElement(elementToCreate);
      newOne.textContent = content;
      if ( elementToCreate ) {
        newOne.className = classToAdd;
      }
      return newOne;
    }

    tr.appendChild(createElement('td', make));
    tr.appendChild(createElement('td', model));
    tr.appendChild(createElement('td', year));
    tr.appendChild(createElement('td', fuel));
    tr.appendChild(createElement('td', originalCost));
    tr.appendChild(createElement('td', sellingPrice));

    const editBtn = createElement('button', 'Edit', 'action-btn edit');
    const sellBtn = createElement('button', 'Sell', 'action-btn sell');

    const td = document.createElement('td');
    td.appendChild(editBtn);
    td.appendChild(sellBtn);

    tr.appendChild(td);

    tbody.appendChild(tr);

    for (const input in inputs) {
      inputs[input].value = '';
    }

    tr.querySelector('.edit').addEventListener('click', onClickEdit);

    function onClickEdit() {
      tr.remove();

      inputs.make.value = make;
      inputs.model.value = model;
      inputs.year.value = year;
      inputs.fuel.value = fuel;
      inputs.originalCost.value = originalCost;
      inputs.sellingPrice.value = sellingPrice;
    }

    tr.querySelector('.sell').addEventListener('click', onClickSell);

    function onClickSell() {
      tr.remove();
      const li = createElement('li', '', 'each-list');
      const makeAndModel = make + ' ' + model;
      const difference = +sellingPrice - +originalCost;

      li.appendChild(createElement('span', makeAndModel));
      li.appendChild(createElement('span', year));
      li.appendChild(createElement('span', difference));

      carsList.appendChild(li);

      const profitNew = Number(profit.textContent) + Number(difference);
      profit.textContent = 0;
      profit.textContent = (Number(profit.textContent) +  Number(profitNew)).toFixed(2);
    }
  }
}

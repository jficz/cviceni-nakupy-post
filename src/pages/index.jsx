import { render } from '@czechitas/render';
import { ShopItem } from '../components/ShopItem';
import '../global.css';
import './index.css';

// TODO nezapomeňte nastavit svůj login – jednoznačný identifikátor (třeba název účtu na GitHubu)
const login = "jficz"

const response = await fetch(
  'https://nakupy.czechitas.dev/api/mon',
  {
    headers: {
      Authorization: login,
    },
  },
);
const list = await response.json();

const HomePage = () => (
  <>
    <div className="banner"></div>
    <div className="container">
      <form className="newitem-form">
        <label htmlFor="input-name">Položka</label>
        <input id="input-name" type="text" />
        <label htmlFor="input-amount">Množství</label>
        <input id="input-amount" type="text" />
        <label htmlFor="input-unit">Jednotka</label>
        <input id="input-unit" type="text" />
        <button className="btn-add">Přidat</button>
      </form>
      <div className="shoplist">
        {list.map((item) => (
          <ShopItem 
            key={item.id}
            id={item}
            name={item.product}
            amount={item.amount + ' ' + item.unit}
            bought={item.done}
          />
        ))}
      </div>
    </div>
  </>
);

document.querySelector('#root').innerHTML = render(<HomePage />);


for (let i=1; i< 10; i++){
  console.log(i)
}


const handleDelete = async (e) => {
// https://nakupy.czechitas.dev/api/:day/:i
  const itemId = e.target.parentElement.id
  await fetch(
      `https://nakupy.czechitas.dev/api/mon/${itemId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: login,
        },
        //body: JSON.stringify(body),
      },
    );

    window.location.reload();
}

document.querySelectorAll('.btn-delete').forEach((item) => {
  item.addEventListener('click', handleDelete)
})



document.querySelector('.newitem-form')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('#input-name');
    const amountInput = document.querySelector('#input-amount');
    const unitInput = document.querySelector('#input-unit');

    const body = {
      product: nameInput.value,
      amount: Number(amountInput.value),
      unit: unitInput.value,
      done: false,
    };

    await fetch(
      'https://nakupy.czechitas.dev/api/mon',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: login,
        },
        body: JSON.stringify(body),
      },
    );

    window.location.reload();
  }
);


import './style.css';

export const ShopItem = ({ id, name, amount, bought }) => {
  const tickClass = bought ? 'btn-tick btn-tick--on' : 'btn-tick';
  return (
    <div className="shopitem" id={id}>
      <button className={tickClass} />
      <div className="shopitem__name">{name}</div>
      <div className="shopitem__amount">{amount}</div>
      <button className="btn-delete">Smazat</button>
    </div>
  );
};

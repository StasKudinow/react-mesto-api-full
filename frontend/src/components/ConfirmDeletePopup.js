import PopupWithForm from "./PopupWithForm";


function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmitDelete(props.card);
  };


  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="delete"
      title="Вы уверены?"
      button="Да"
    />
  );
}

export default ConfirmDeletePopup;
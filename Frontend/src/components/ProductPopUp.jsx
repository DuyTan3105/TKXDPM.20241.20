import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const ModalWrapper = styled(Modal)`
  margin: 1.5rem;
  padding: 1.5rem;
  border: 2px solid #d1d5db; /* border-gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  background-color: #f9fafb; /* bg-gray-50 */
  max-height: 80vh;
  overflow-y: scroll;
`;

const Heading = styled.h2`
  font-size: 1.25rem; /* text-xl */
  font-weight: 700; /* font-bold */
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  margin-bottom: 0.5rem; /* mb-2 */
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border: 1px solid #d1d5db; /* border */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* shadow-sm */
  outline: none;
  &:focus {
    ring: 2px solid #3b82f6; /* focus:ring-2 focus:ring-blue-500 */
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border: 1px solid #d1d5db; /* border */
  border-radius: 0.375rem; /* rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); /* shadow-sm */
  outline: none;
  &:focus {
    ring: 2px solid #3b82f6; /* focus:ring-2 focus:ring-blue-500 */
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem; /* py-2 px-4 */
  border-radius: 0.375rem; /* rounded-md */
  background-color: ${(props) => (props.cancel ? "#6b7280" : "#3b82f6")}; /* bg-gray-500 / bg-blue-500 */
  color: white;
  margin-right: ${(props) => (props.cancel ? "1rem" : "0")};
  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#4b5563" : "#2563eb"}; /* hover:bg-gray-600 / hover:bg-blue-600 */
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const ProductPopUp = (props) => {
  const {
    modalIsOpen,
    closeModal,
    formData,
    handleProductTypeChange,
    handleSubmit,
    handleInputChange,
    isEdit,
    handleEditProduct,
  } = props;

  return (
    <ModalWrapper
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel={isEdit ? "Edit Product" : "Add Product"}
    >
      <Heading>{isEdit ? "Edit Product" : "Add Product"}</Heading>
      <form onSubmit={isEdit ? handleEditProduct : handleSubmit}>
        <Label>
          Product
          <Select
            value={formData.type}
            onChange={handleProductTypeChange}
          >
            <option value="book">Book</option>
            <option value="cd">CD</option>
            <option value="dvd">DVD</option>
          </Select>
        </Label>

        <Label>
          Title
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Label>

        <Label>
          Import Price
          <Input
            type="number"
            name="importPrice"
            value={formData.importPrice}
            onChange={handleInputChange}
            required
          />
        </Label>

        <Label>
          Sell Price
          <Input
            type="number"
            name="sellPrice"
            value={formData.sellPrice}
            onChange={handleInputChange}
            required
          />
        </Label>

        <Label>
          Quantity
          <Input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </Label>

        <Label>
          ImageURL
          <Input
            type="text"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleInputChange}
            required
          />
        </Label>

        <Label>
          Rush Delivery Support
          <Select
            name="rushDeliverySupport"
            value={formData.rushDeliverySupport}
            onChange={handleInputChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Select>
        </Label>

        {/* Conditionally Render Inputs for book, cd, and dvd */}
        {formData.type === "book" && (
          <>
            <Label>
              Author
              <Input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Cover Type
              <Input
                type="text"
                name="coverType"
                value={formData.coverType}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Publisher
              <Input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Publish Date
              <Input
                type="date"
                name="publishDate"
                value={formData.publishDate}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Number of Pages
              <Input
                type="number"
                name="numOfPages"
                value={formData.numOfPages}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Language
              <Input
                type="text"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Book Category
              <Input
                type="text"
                name="bookCategory"
                value={formData.bookCategory}
                onChange={handleInputChange}
                required
              />
            </Label>
          </>
        )}

        {formData.type === "cd" && (
          <>
            <Label>
              Artist
              <Input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Record Label
              <Input
                type="text"
                name="recordLabel"
                value={formData.recordLabel}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Music Type
              <Input
                type="text"
                name="musicType"
                value={formData.musicType}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Released Date
              <Input
                type="date"
                name="releasedDate"
                value={formData.releasedDate}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Form
              <Input
                type="text"
                name="form"
                value={formData.form}
                onChange={handleInputChange}
                required
              />
            </Label>
          </>
        )}

        {formData.type === "dvd" && (
          <>
            <Label>
              Form
              <Input
                type="text"
                name="form"
                value={formData.form}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Disc Type
              <Input
                type="text"
                name="discType"
                value={formData.discType}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Director
              <Input
                type="text"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Runtime
              <Input
                type="text"
                name="runtime"
                value={formData.runtime}
                onChange={handleInputChange}
                required
              />
            </Label>
            <Label>
              Movie Category
              <Input
                type="text"
                name="movieCategory"
                value={formData.movieCategory}
                onChange={handleInputChange}
                required
              />
            </Label>
          </>
        )}

        <FlexContainer>
          <Button cancel onClick={closeModal}>
            Cancel
          </Button>
          <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
        </FlexContainer>
      </form>
    </ModalWrapper>
  );
};

export default ProductPopUp;

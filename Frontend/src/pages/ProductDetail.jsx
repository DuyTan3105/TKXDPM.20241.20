import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const Wrapper = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const DetailWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const ImageWrapper = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  object-fit: contain;
`;

const InfoWrapper = styled.div`
  flex: 2;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
`;

const Price = styled.h2`
  font-size: 1.5rem;
  color: #4caf50;
  margin-top: 1rem;
`;

const ProductDetailPage = () => {
    const { id } = useParams(); // Lấy id sản phẩm từ URL
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Lấy thông tin sản phẩm từ API
        const fetchProductDetail = async () => {
            try {
                const response = await axiosInstance.get(`/products/${id}`); // API lấy sản phẩm theo id
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchProductDetail();
    }, [id]);

    if (!product) return <div>Loading...</div>; // Hiển thị loading khi đang lấy dữ liệu

    return (
        <Wrapper>
            <Title>{product.title}</Title>
            <DetailWrapper>
                <ImageWrapper>
                    <Image src={product.imageURL} alt={product.title} />
                </ImageWrapper>
                <InfoWrapper>
                    <Price>${product.sellPrice}</Price>
                    <Description>{product.description}</Description>

                    {/* Hiển thị thêm chi tiết theo loại sản phẩm */}
                    {product.type === "book" && (
                        <div>
                            <h3>Author: {product.author}</h3>
                            <h4>Publisher: {product.publisher}</h4>
                            <p>Published Date: {new Date(product.publishDate).toLocaleDateString()}</p>
                            <p>Pages: {product.numOfPages}</p>
                        </div>
                    )}

                    {product.type === "cd" && (
                        <div>
                            <h3>Artist: {product.artist}</h3>
                            <h4>Record Label: {product.recordLabel}</h4>
                            <p>Released Date: {new Date(product.releasedDate).toLocaleDateString()}</p>
                            <p>Music Type: {product.musicType}</p>
                        </div>
                    )}

                    {product.type === "dvd" && (
                        <div>
                            <h3>Director: {product.director}</h3>
                            <h4>Studio: {product.studio}</h4>
                            <p>Released Date: {new Date(product.releasedDate).toLocaleDateString()}</p>
                            <p>Runtime: {product.runtime}</p>
                        </div>
                    )}
                </InfoWrapper>
            </DetailWrapper>
        </Wrapper>
    );
};

export default ProductDetailPage;

"use server"

import { scrapeAmazonProduct } from "../scraper";
import { ConnectToDb } from "../scraper/mongoos";
import { revalidatePath } from "next/cache";
import Product from "../models/product.models";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
  if(!productUrl) return;

  try {
    ConnectToDb()
    const scrapedProduct = await scrapeAmazonProduct(productUrl);
     if(!scrapedProduct) return
     let product = scrapedProduct;

     const existingProduct = await Product.findOne({ url: scrapedProduct.url });
 
     if(existingProduct) {
       const updatedPriceHistory: any = [
         ...existingProduct.priceHistory,
         { price: scrapedProduct.currentPrice }
       ]
 
       product = {
         ...scrapedProduct,
         priceHistory: updatedPriceHistory,
         lowestPrice: getLowestPrice(updatedPriceHistory),
         highestPrice: getHighestPrice(updatedPriceHistory),
         averagePrice: getAveragePrice(updatedPriceHistory),
       }
     }
 
     const newProduct = await Product.findOneAndUpdate(
       { url: scrapedProduct.url },
       product,
       { upsert: true, new: true }
     );
 
     revalidatePath(`/products/${newProduct._id}`);

  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    ConnectToDb()

    const product = await Product.findOne({ _id: productId });

    if(!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}
export async function getAllProducts() {
  try {
    ConnectToDb();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

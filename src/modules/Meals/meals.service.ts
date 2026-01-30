import { integer } from './../../../node_modules/effect/src/Config';
import { string } from "better-auth"
import { prisma } from "../../lib/prisma"





const getAllMeals = async ({
  search,
  name,
  description,
  isAvailable,
  category,
  reviews,
  ratings,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  name: string | undefined;
  description: string | undefined;
  isAvailable:boolean | undefined;
  category: string | undefined;
  reviews: string | undefined;
  ratings: number | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
    const andConditions:any[]=[]

    if(search){
        andConditions.push({
            OR:[
                {name:{contains:search,mode:'insensitive'}},
                {description:{contains:search,mode:'insensitive'}},
            ]
        })
    }
    if(ratings){
        andConditions.push({reviews:{some:{ratings:{gte:ratings}}}})
    }

    if(category){
        andConditions.push({category:{name:{equals:category,mode:'insensitive'}}})
    }

    if(typeof isAvailable==='boolean'){
        andConditions.push({providers:{some:{isAvailable:true}}})
    }
   
    
  const result = await prisma.meal.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      category: true,
      reviews: true,
      provider: {
        where: { isAvailable: true },
        select: {
          price: true,
          provider: {
            select: {
              restaurantName: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.meal.count({
    where: {
      AND: andConditions,
    },
    
  })
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};


export const mealService = {getAllMeals}
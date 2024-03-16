"use strict"

module.exports=(req,res,next)=>{
    const { filter = {},  sort = {} }= req.query;

    const search = req.query?.search || "";
    let searchQuery = [];
    if (search) {
        searchQuery.$or= [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }
    
    let limit = Number(req.query?.limit)
    limit=limit > 0 ? limit : Number(process.env.PAGE_SIZE || 20)
   
    let page=Number(req.query?.page)
    page=page <0 ? (page-1): 0

    let skip=Number(req.query?.skip)
    skip=skip> 0 ? skip : (page*limit)

 res.getQueryList= async function (Query, populate) {
    return await Query.find({...filter, ...searchQuery}).sort(sort).skip(skip).limit(limit).populate(populate)
 }

 res.getQueryListDetails= async (Query)=>{

    // Model bazında bir sorgu yaparak, sorgu sonuçlarını alır.
const data = await Query.find({ ...filter, ...searchQuery });

// Sorgu detaylarını içeren bir obje oluşturur.
let details = {
  filter, // Kullanılan filtre parametrelerini saklar.
  search, // Kullanılan arama parametrelerini saklar.
  sort, // Kullanılan sıralama parametrelerini saklar.
  skip, // Atlanacak kayıt sayısını saklar.
  limit, // Sayfa başına gösterilecek kayıt sayısını saklar.
  page, // Geçerli sayfa numarasını saklar.
  pages: {
    // Sayfalama bilgilerini içeren bir alt obje.
    previous: page > 0 ? page : false, // Bir önceki sayfa varsa onun numarasını, yoksa false değerini saklar.
    current: page + 1, // Geçerli sayfa numarası
    next: page + 2, // Bir sonraki sayfa numarasını hesaplar.
    total: Math.ceil(data.length / limit) // Toplam sayfa sayısını hesaplar.
  },
  totalRecords: data.length, // Toplam kayıt sayısını saklar.
};

// Eğer bir sonraki sayfa mevcut toplam sayfa sayısını aşarsa, false olarak ayarlar.
details.pages.next = details.pages.next > details.pages.total ? false : details.pages.next;

// Eğer toplam kayıt sayısı, sayfa limitini aşmıyorsa, sayfalama bilgileri olarak false ayarlar.
if (details.totalRecords <= limit) details.pages = false;

// Hazırlanan detaylar objesini döndürür.
return details;




 }
 next();

}
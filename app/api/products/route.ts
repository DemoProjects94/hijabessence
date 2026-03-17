import { NextResponse } from "next/server";

const generateMockProducts = () => {
  const products = [];
  const categories = ["Basics", "Premium", "Prints", "Occasion"];
  const types = ["Chiffon", "Silk", "Modal", "Jersey"];
  const colors = [
    { name: "Nude", hex: "#f3e1d5" },
    { name: "Latte", hex: "#d4b59e" },
    { name: "Olive", hex: "#708238" },
    { name: "Navy", hex: "#000080" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Maroon", hex: "#800000" }
  ];

  for (let i = 1; i <= 90; i++) {
    const imageIdx = ((i - 1) % 29) + 1;
    const type = types[i % types.length];
    const category = categories[i % categories.length];
    const color = colors[i % colors.length];
    
    products.push({
      id: `product-${i}`,
      name: `${type} ${category} ${color.name}`,
      fabric: type,
      category: category,
      type: type,
      color: color.name,
      hex_color: color.hex,
      price_iqd: (15 + (i % 5)*5) * 1000, 
      price_usd: parseFloat(((15 + (i % 5)*5) / 1.5).toFixed(2)),
      stock_level: (i * 3) % 20,
      image_url: `/images/Scarf/photo_${imageIdx}_2026-03-16_23-04-28.jpg`
    });
  }
  return products;
};

let mockProducts = generateMockProducts();

export async function GET() {
  try {
    await new Promise(res => setTimeout(res, 300));
    return NextResponse.json({
      data: mockProducts,
      success: true
    });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message 
    }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newProduct = {
      id: `product-custom-${Date.now()}`,
      name: body.name || "Custom Product",
      fabric: body.fabric || "Custom",
      category: body.category || "Basics",
      type: body.type || "Custom",
      color: body.color || "Custom",
      hex_color: body.hex_color || "#ffffff",
      price_iqd: Number(body.price_iqd) || 15000,
      price_usd: Number((Number(body.price_iqd) / 1500).toFixed(2)) || 10,
      stock_level: Number(body.stock_level) || 10,
      image_url: body.image_url || "/images/Scarf/photo_5_2026-03-16_23-04-28.jpg"
    };

    mockProducts = [newProduct, ...mockProducts];
    return NextResponse.json({ success: true, data: newProduct });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 400 });
  }
}

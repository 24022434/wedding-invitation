import sys
from collections import Counter

try:
    from PIL import Image
    # Implement simple k-means or just quantization
except ImportError:
    pass

def get_palette(image_path):
    try:
        img = Image.open(image_path)
        img = img.resize((100, 100))
        img = img.convert('RGB')
        
        pixels = list(img.getdata())
        
        # Simple quantization to reduce color space (e.g. 5 bits per channel)
        # This groups similar colors
        quantized = []
        for r, g, b in pixels:
            # Round to nearest 20
            r = round(r / 20) * 20
            g = round(g / 20) * 20
            b = round(b / 20) * 20
            quantized.append((r, g, b))
            
        counts = Counter(quantized)
        most_common = counts.most_common(10)
        
        print("Top 10 Colors (Approx):")
        for color, count in most_common:
            hex_c = "#{:02x}{:02x}{:02x}".format(color[0], color[1], color[2])
            lum = 0.2126*color[0] + 0.7152*color[1] + 0.0722*color[2]
            print(f"Color: {hex_c} - Count: {count} - Luminance: {lum:.2f}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    image_path = r"c:\Users\Thinkpad X1 Extreme\OneDrive\Desktop\huybn2\wedding_check-master\asset\Photo\KIN06148ok.jpg"
    get_palette(image_path)


import os
from PIL import Image
import shutil

def optimize_images(directory, max_width=1600, quality=85):
    # Create backup directory
    backup_dir = os.path.join(directory, 'original_backup')
    if not os.path.exists(backup_dir):
        os.makedirs(backup_dir)

    # Supported extensions
    extensions = {'.jpg', '.jpeg', '.png'}
    
    count = 0
    saved_space = 0

    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        
        # Skip directories and non-image files
        if os.path.isdir(file_path) or os.path.splitext(filename)[1].lower() not in extensions:
            continue

        # Backup file
        backup_path = os.path.join(backup_dir, filename)
        if not os.path.exists(backup_path):
            shutil.copy2(file_path, backup_path)

        original_size = os.path.getsize(file_path)

        try:
            with Image.open(file_path) as img:
                # Resize if needed
                if img.width > max_width:
                    ratio = max_width / img.width
                    new_height = int(img.height * ratio)
                    img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
                
                # Save optimized
                img.save(file_path, optimize=True, quality=quality)
                
            new_size = os.path.getsize(file_path)
            saved = original_size - new_size
            saved_space += saved
            count += 1
            print(f"Optimized {filename}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB")
            
        except Exception as e:
            print(f"Error processing {filename}: {e}")

    print(f"\nTotal images optimized: {count}")
    print(f"Total space saved: {saved_space/1024/1024:.2f} MB")

if __name__ == "__main__":
    target_dir = r"c:\Users\Thinkpad X1 Extreme\OneDrive\Desktop\huybn2\wedding_check-master\asset\Photo"
    optimize_images(target_dir)

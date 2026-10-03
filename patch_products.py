import re

files = [
    ("src/components/GialloHero.tsx", "giallo", "/videos/giallo_product.mp4"),
    ("src/components/BiancoHero.tsx", "bianco", "/videos/bianco.mp4"),
    ("src/components/SbagliataHero.tsx", "sbagliata", "/videos/sbagliata.mp4")
]

for file_path, video_key, default_src in files:
    with open(file_path, "r") as f:
        content = f.read()
    
    if "useCMS" not in content:
        content = content.replace('import { useTranslation } from "@/context/LanguageContext";', 'import { useTranslation } from "@/context/LanguageContext";\nimport { useCMS } from "@/context/CMSContext";')
    
    # insert useCMS inside the component
    if "const { config } = useCMS();" not in content:
        content = re.sub(r'(export default function \w+\(\) {\n)', r'\1  const { config } = useCMS();\n', content)
    
    content = content.replace(f'src="{default_src}"', f'src={{config?.videos?.{video_key} || "{default_src}"}}')
    
    with open(file_path, "w") as f:
        f.write(content)

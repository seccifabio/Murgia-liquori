import re

with open("src/components/storia/ShippingRitual.tsx", "r") as f:
    content = f.read()

if "useCMS" not in content:
    content = content.replace('import { useTranslation } from "@/context/LanguageContext";', 'import { useTranslation } from "@/context/LanguageContext";\nimport { useCMS } from "@/context/CMSContext";')

if "const { config } = useCMS();" not in content:
    content = re.sub(r'(export default function ShippingRitual\(\) {\n)', r'\1  const { config } = useCMS();\n', content)

content = content.replace('img: "/images/storia/shipping_ritual_lab_preparing.png",', 'img: config?.images?.preparazioneLab || "/images/storia/shipping_ritual_lab_preparing.png",')

with open("src/components/storia/ShippingRitual.tsx", "w") as f:
    f.write(content)

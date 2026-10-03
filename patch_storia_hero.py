import re

with open("src/components/storia/StoriaHero.tsx", "r") as f:
    content = f.read()

if "useCMS" not in content:
    content = content.replace('import { useTranslation } from "@/context/LanguageContext";', 'import { useTranslation } from "@/context/LanguageContext";\nimport { useCMS } from "@/context/CMSContext";')

if "const { config } = useCMS();" not in content:
    content = re.sub(r'(export default function StoriaHero\(\) {\n)', r'\1  const { config } = useCMS();\n', content)

content = content.replace('src="/images/storia/storia_origins_1882_1775937746086.png"', 'src={config?.images?.storiaHero || "/images/storia/storia_origins_1882_1775937746086.png"}')

with open("src/components/storia/StoriaHero.tsx", "w") as f:
    f.write(content)

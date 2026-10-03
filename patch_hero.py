import re

with open("src/components/Hero.tsx", "r") as f:
    content = f.read()

# Make sure useCMS is imported
if "useCMS" not in content:
    content = content.replace('import { useTranslation } from "@/context/LanguageContext";', 'import { useTranslation } from "@/context/LanguageContext";\nimport { useCMS } from "@/context/CMSContext";')

# Fetch config in Hero component
if "const { config } = useCMS();" not in content:
    content = content.replace('const isMobile = useIsMobile();', 'const isMobile = useIsMobile();\n  const { config } = useCMS();')

# Replace hardcoded video src
content = content.replace('src="/videos/hero.mp4"', 'src={config?.videos?.hero || "/videos/hero.mp4"}')

with open("src/components/Hero.tsx", "w") as f:
    f.write(content)

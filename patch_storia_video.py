import re

with open("src/components/storia/StoriaVideo.tsx", "r") as f:
    content = f.read()

if "useCMS" not in content:
    content = content.replace('import { useState, useRef, useEffect } from "react";', 'import { useState, useRef, useEffect } from "react";\nimport { useCMS } from "@/context/CMSContext";')

if "const { config } = useCMS();" not in content:
    content = re.sub(r'(export default function StoriaVideo\(\) {\n)', r'\1  const { config } = useCMS();\n', content)

content = content.replace('const videoId = "TpAl52rlf4s";', 'const videoId = config?.videos?.storiaYoutubeId || "TpAl52rlf4s";')

with open("src/components/storia/StoriaVideo.tsx", "w") as f:
    f.write(content)

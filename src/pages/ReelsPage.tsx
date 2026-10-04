import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { soundFx } from "../utils/audio";

interface LanguageOption {
  code: string;
  langKey: string;
  label: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: "en-US", langKey: "en", label: "English", flag: "🇺🇸" },
  { code: "hi-IN", langKey: "hi", label: "Hindi (हिन्दी)", flag: "🇮🇳" },
  { code: "es-ES", langKey: "es", label: "Spanish (Español)", flag: "🇪🇸" },
  { code: "fr-FR", langKey: "fr", label: "French (Français)", flag: "🇫🇷" },
];

const translations: Record<number, Record<string, string>> = {
  1: {
    en: "The Two Pointer technique uses two indices traversing from opposite ends toward the center, optimizing time complexity from O(n²) to O(n).",
    hi: "टू-पॉइंटर तकनीक दो इंडेक्स का उपयोग करती है जो दोनों छोर से केंद्र की ओर चलते हैं, जिससे समय O(n) हो जाता है।",
    es: "La técnica de dos punteros utiliza dos índices que van desde ambos extremos hacia el centro, reduciendo la complejidad a O(n).",
    fr: "La technique des deux pointeurs utilise deux index allant des deux extrémités vers le centre, réduisant le temps à O(n).",
  },
  2: {
    en: "Binary Search halves the sorted search space in logarithmic O(log N) steps. Always compute mid safely to avoid overflow!",
    hi: "बाइनरी सर्च सॉर्ट किए गए सर्च स्पेस को आधा कर देती है। ओवरफ्लो से बचने के लिए हमेशा मिड सुरक्षित रूप से निकालें!",
    es: "Binary Search reduce a la mitad el espacio de búsqueda. ¡Calcula siempre el punto medio de forma segura!",
    fr: "La recherche binaire divise par deux l'espace de recherche. Calculez toujours le milieu en toute sécurité!",
  },
  3: {
    en: "LRU Cache combines O(1) Hash Map lookup speed with Doubly-Linked List ordering for lightning-fast eviction.",
    hi: "एलआरयू कैश ओ(1) हैश मैप लुकअप गति को डबली-लिंक्ड लिस्ट ऑर्डरिंग के साथ जोड़ता है।",
    es: "LRU Cache combina búsquedas rápidas en tablas hash O(1) con listas doblemente enlazadas.",
    fr: "Le cache LRU combine des recherches O(1) dans une table de hachage avec une liste doublement chaînée.",
  },
  4: {
    en: "Sliding Window computes subsegment aggregates dynamically by sliding a window boundary over arrays in O(N) time.",
    hi: "स्लाइडिंग विंडो तकनीक ऐरे पर विंडो बाउंड्री को स्लाइड करके O(N) समय में सब-सेगमेंट मान निकालती है।",
    es: "Sliding Window calcula agregados de subsegmentos deslizando los límites de una ventana en tiempo O(N).",
    fr: "La fenêtre glissante calcule les agrégats de sous-segments en faisant glisser les limites d'une fenêtre en temps O(N).",
  },
  5: {
    en: "Breadth-First Search (BFS) explores graphs layer by layer using a Queue to guarantee the shortest path in unweighted graphs.",
    hi: "ब्रेडथ-फर्स्ट सर्च (BFS) क्यू का उपयोग करके ग्राफ की परत-दर-परत खोज करता है और सबसे छोटा रास्ता ढूंढता है।",
    es: "BFS explora gráficos capa por capa utilizando una cola para garantizar el camino más corto.",
    fr: "BFS explore les graphes couche par couche à l'aide d'une file d'attente pour garantir le chemin le plus court.",
  },
  6: {
    en: "Token Bucket Rate Limiter replenishes tokens at a constant rate, accommodating bursts of network traffic while preventing overload.",
    hi: "टोकन बकेट रेट लिमिटर एक निश्चित दर पर टोकन भरता है, जिससे नेटवर्क ओवरलोड रोका जा सकता है।",
    es: "Token Bucket Rate Limiter repone tokens a un ritmo constante, permitiendo ráfagas sin sobrecargar la red.",
    fr: "Le limiteur de débit Token Bucket réapprovisionne les jetons à un rythme constant pour éviter les surcharges.",
  },
  7: {
    en: "Dynamic Programming Memoization stores subproblem solutions in a table, transforming exponential O(2ⁿ) algorithms into linear O(n).",
    hi: "डायनेमिक प्रोग्रामिंग मेमोइज़ेशन उप-समस्याओं के समाधान को तालिका में सहेजता है, जिससे समय O(n) हो जाता है।",
    es: "La memoización en programación dinámica almacena soluciones intermedias convirtiendo tiempo exponencial a lineal.",
    fr: "La mémoïsation en programmation dynamique stocke les sous-problèmes pour passer d'un temps exponentiel à linéaire.",
  },
  8: {
    en: "React 19 Server Components render on the server, eliminating zero-bundle-size dependencies and speeding up initial page render.",
    hi: "रिएक्ट 19 सर्वर कंपोनेंट्स सर्वर पर रेंडर होते हैं, जिससे बंडल साइज शून्य हो जाता है और पेज तेजी से लोड होता है।",
    es: "Los React 19 Server Components se ejecutan en el servidor, reduciendo el tamaño del bundle a cero.",
    fr: "Les composants serveur React 19 sont rendus sur le serveur, réduisant la taille du bundle JavaScript client.",
  },
  9: {
    en: "3D Wireframe Hypercube algorithm projects 3D spatial points with real-time perspective matrices for 3D physics engines.",
    hi: "3D वायरफ्रेम हाइपरक्यूब एल्गोरिदम 3D स्पेशियल पॉइंट प्रोजेक्ट करता है।",
    es: "Visualización 3D en tiempo real con proyección espacial de matrices.",
    fr: "Visualisation 3D en temps réel avec projection matricielle spatiale.",
  },
  10: {
    en: "3D Spatial Binary Tree renders hierarchical node trees in full 3D orbital space with interactive depth scaling.",
    hi: "3D स्पेशियल बाइनरी ट्री 3D ऑर्बिटल स्पेस में नोड ट्री को रेंडर करता है।",
    es: "Árbol binario espacial en 3D con rotación orbital y profundidad.",
    fr: "Arbre binaire spatial 3D avec rotation orbitale et mise à l'échelle en profondeur.",
  },
  11: {
    en: "3D Neural Network Attention Mesh simulates 3D transformer multi-head attention weights with floating particle pulses.",
    hi: "3D न्यूरल नेटवर्क अटेंशन मेश 3D ट्रांसफॉर्मर वेट्स सिमुलेट करता है।",
    es: "Red neuronal 3D con peso de atención y pulsos de partículas.",
    fr: "Réseau de neurones 3D avec poids d'attention et impulsions.",
  },
  12: {
    en: "3D Distributed Cluster Engine renders load balancers, multi-region database shards, and packet lasers in isometric 3D space.",
    hi: "3D डिस्ट्रीब्यूटेड क्लस्टर इंजन 3D स्पेस में लोड बैलेंसर और पैकेट लेजर रेंडर करता है।",
    es: "Motor de clúster distribuido en 3D con servidores isométricos y rayos láser.",
    fr: "Moteur de cluster distribué 3D avec serveurs isométriques et lasers.",
  },
};

interface CommentItem {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
}

interface ReelItem {
  id: number;
  title: string;
  creator: string;
  avatar: string;
  role: string;
  topic: string;
  category: "DSA" | "System Design" | "Frontend" | "Algorithms" | "3D Graphics";
  views: number;
  likes: number;
  commentsCount: number;
  duration: string;
  videoUrl?: string;
  codeSnippet: string;
  hashtags: string[];
  problemId?: number;
  comments: CommentItem[];
  is3D?: boolean;
}

export default function ReelsPage() {
  const navigate = useNavigate();

  const [reelsList, setReelsList] = useState<ReelItem[]>([
    {
      id: 9,
      title: "3D Wireframe Hypercube & Sorting",
      creator: "Prof. Turing",
      avatar: "PT",
      role: "3D Graphics & Engine Architect",
      topic: "3D Perspective Matrix",
      category: "3D Graphics",
      is3D: true,
      views: 52400,
      likes: 4920,
      commentsCount: 210,
      duration: "0:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      hashtags: ["#3d", "#graphics", "#webgl", "#matrix", "#codecampus"],
      problemId: 1,
      codeSnippet: `// 3D Perspective Projection Matrix Math\nfunction project3D(x, y, z, angleX, angleY) {\n  const radX = angleX * Math.PI / 180;\n  const radY = angleY * Math.PI / 180;\n  const x1 = x * Math.cos(radY) + z * Math.sin(radY);\n  const z1 = -x * Math.sin(radY) + z * Math.cos(radY);\n  const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);\n  const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);\n  const scale = 250 / (z2 + 300);\n  return [x1 * scale + 200, y2 * scale + 320];\n}`,
      comments: [
        { id: 901, user: "Ananya Patel", avatar: "AP", text: "Insane 3D wireframe performance on canvas!", time: "10m ago", likes: 42 },
        { id: 902, user: "Vikram Singh", avatar: "VS", text: "The depth scaling matrix calculation is top tier!", time: "1h ago", likes: 19 },
      ],
    },
    {
      id: 10,
      title: "3D Spatial Binary Tree Exploration",
      creator: "Dr. Ada Lovelace",
      avatar: "AL",
      role: "Algorithms Fellow",
      topic: "3D Spatial Topology",
      category: "3D Graphics",
      is3D: true,
      views: 48900,
      likes: 4120,
      commentsCount: 184,
      duration: "0:50",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      hashtags: ["#3dtree", "#dsa3d", "#spatial", "#nodes"],
      problemId: 2,
      codeSnippet: `// 3D Node Tree Ray Projection\nclass Node3D {\n  constructor(id, x, y, z) {\n    this.id = id;\n    this.pos = { x, y, z };\n    this.children = [];\n  }\n  renderOrbit(ctx, angle) {\n    const p = project3D(this.pos.x, this.pos.y, this.pos.z, 20, angle);\n    drawSphere(ctx, p[0], p[1], 12);\n  }\n}`,
      comments: [
        { id: 1001, user: "Rohan Mehta", avatar: "RM", text: "Visualizing trees in 3D orbital space makes traversal so intuitive!", time: "30m ago", likes: 27 },
      ],
    },
    {
      id: 11,
      title: "3D Neural Network Attention Mesh",
      creator: "Pooja Iyer",
      avatar: "PI",
      role: "AI & WebGL Architect",
      topic: "3D Deep Learning Mesh",
      category: "3D Graphics",
      is3D: true,
      views: 61000,
      likes: 5890,
      commentsCount: 290,
      duration: "0:55",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      hashtags: ["#neural3d", "#transformer", "#ai", "#mesh"],
      problemId: 3,
      codeSnippet: `// 3D Multi-Layer Attention Pulse\nfunction draw3DAttentionPulses(ctx, layers, time) {\n  for (let l = 0; l < layers.length - 1; l++) {\n    for (let i = 0; i < layers[l].nodes.length; i++) {\n      const p1 = project3D(layers[l].nodes[i].x, layers[l].nodes[i].y, layers[l].z, 15, time * 20);\n      const p2 = project3D(layers[l+1].nodes[i].x, layers[l+1].nodes[i].y, layers[l+1].z, 15, time * 20);\n      drawLaserBeam(ctx, p1, p2);\n    }\n  }\n}`,
      comments: [
        { id: 1101, user: "Dr. Anita Roy", avatar: "AR", text: "Attention mechanisms visualised in true 3D spatial dimensions!", time: "45m ago", likes: 64 },
      ],
    },
    {
      id: 12,
      title: "3D Distributed Cluster Architecture",
      creator: "Dr. Anita Roy",
      avatar: "AR",
      role: "System Architect",
      topic: "3D Infrastructure",
      category: "3D Graphics",
      is3D: true,
      views: 57800,
      likes: 4780,
      commentsCount: 195,
      duration: "0:48",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      hashtags: ["#systemdesign3d", "#cloud3d", "#architecture"],
      problemId: 2,
      codeSnippet: `// 3D Isometric Server Node Cluster\nfunction draw3DServerBlock(ctx, x, y, z, size, color) {\n  const top = project3D(x, y - size, z, 30, 45);\n  const bot = project3D(x, y + size, z, 30, 45);\n  draw3DCubeFaces(ctx, top, bot, color);\n}`,
      comments: [
        { id: 1201, user: "Prof. Sameer Jain", avatar: "SJ", text: "The packet lasers firing between isometric 3D nodes are amazing!", time: "2h ago", likes: 38 },
      ],
    },
    {
      id: 1,
      title: "Two Pointer Technique in 60s",
      creator: "Prof. Turing",
      avatar: "PT",
      role: "Lead DSA Architect",
      topic: "Arrays & Pointers",
      category: "DSA",
      views: 24800,
      likes: 1940,
      commentsCount: 84,
      duration: "0:45",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      hashtags: ["#dsa", "#twopointers", "#codecampus", "#leetcode"],
      problemId: 1,
      codeSnippet: `def two_sum_sorted(nums, target):\n    left, right = 0, len(nums) - 1\n    while left < right:\n        curr_sum = nums[left] + nums[right]\n        if curr_sum == target:\n            return [left, right]\n        elif curr_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []`,
      comments: [
        { id: 101, user: "Ananya Patel", avatar: "AP", text: "This visual reduced my execution time drastically! Thanks prof!", time: "2h ago", likes: 14 },
      ],
    },
    {
      id: 2,
      title: "Binary Search Halving Visualizer",
      creator: "Dr. Ada Lovelace",
      avatar: "AL",
      role: "Algorithms Fellow",
      topic: "Logarithmic Search",
      category: "DSA",
      views: 18900,
      likes: 1420,
      commentsCount: 52,
      duration: "0:50",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      hashtags: ["#binarysearch", "#algorithms", "#complexity"],
      problemId: 2,
      codeSnippet: `def binary_search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = low + (high - low) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
      comments: [],
    },
  ]);

  // Active state navigation & filters
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [viewMode, setViewMode] = useState<"video" | "canvas">("canvas");
  const [selectedLang, setSelectedLang] = useState<LanguageOption>(languages[0]);
  
  // Interactive social maps
  const [likedMap, setLikedMap] = useState<Record<number, boolean>>({});
  const [savedMap, setSavedMap] = useState<Record<number, boolean>>({});
  const [likesCountMap, setLikesCountMap] = useState<Record<number, number>>({});
  const [progress, setProgress] = useState(0);

  // Modals & Drawers
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Upload Reel Form State
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("3D Algorithm Engine");
  const [newCategory, setNewCategory] = useState<"DSA" | "System Design" | "Frontend" | "Algorithms" | "3D Graphics">("3D Graphics");
  const [newCode, setNewCode] = useState("// 3D Custom Render Shader/Projection Math\nfunction render3DScene(ctx, time) {\n  // 3D Space Transformation\n}");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered reels array
  const filteredReels = reelsList.filter((reel) => {
    const matchesCategory =
      selectedCategory === "All"
        ? true
        : selectedCategory === "Saved"
        ? !!savedMap[reel.id]
        : reel.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      reel.title.toLowerCase().includes(query) ||
      reel.creator.toLowerCase().includes(query) ||
      reel.topic.toLowerCase().includes(query) ||
      reel.hashtags.some((h) => h.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const activeReel = filteredReels[activeIdx] || filteredReels[0] || reelsList[0];
  const isLiked = !!likedMap[activeReel?.id];
  const isSaved = !!savedMap[activeReel?.id];
  const currentLikes = (likesCountMap[activeReel?.id] ?? activeReel?.likes) + (isLiked ? 1 : 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        soundFx.playClick();
        setActiveIdx((prev) => (prev + 1) % filteredReels.length);
        setProgress(0);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        soundFx.playClick();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : filteredReels.length - 1));
        setProgress(0);
      } else if (e.key === " ") {
        e.preventDefault();
        soundFx.playClick();
        setPlaying((p) => !p);
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        soundFx.playClick();
        setMuted((m) => !m);
      } else if (e.key.toLowerCase() === "l") {
        e.preventDefault();
        handleToggleLike();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredReels.length, activeReel?.id]);

  // Video Element Speed Sync
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed, activeIdx, viewMode]);

  // 3D & 2D Canvas Renderer Engine
  useEffect(() => {
    let animFrame: number;
    if (viewMode === "canvas" && canvasRef.current && activeReel) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let angle = 0;

      // 3D Perspective Projection Helper
      const project3D = (x: number, y: number, z: number, angleX: number, angleY: number) => {
        const radX = (angleX * Math.PI) / 180;
        const radY = (angleY * Math.PI) / 180;

        const x1 = x * Math.cos(radY) + z * Math.sin(radY);
        const z1 = -x * Math.sin(radY) + z * Math.cos(radY);

        const y2 = y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = y * Math.sin(radX) + z1 * Math.cos(radX);

        const perspective = 280;
        const scale = perspective / (z2 + 320);

        return {
          x: x1 * scale + canvas.width / 2,
          y: y2 * scale + canvas.height / 2 - 40,
          scale,
          z: z2,
        };
      };

      const renderCanvasFrame = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dark tech gradient background
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, "#08080E");
        grad.addColorStop(0.5, "#12121E");
        grad.addColorStop(1, "#05050A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        angle += 1.2 * playbackSpeed;
        const progressFrac = progress / 100;

        // 3D Wireframe Cube (Reel ID 9)
        if (activeReel.id === 9) {
          const cubeVertices = [
            { x: -70, y: -70, z: -70 },
            { x: 70, y: -70, z: -70 },
            { x: 70, y: 70, z: -70 },
            { x: -70, y: 70, z: -70 },
            { x: -70, y: -70, z: 70 },
            { x: 70, y: -70, z: 70 },
            { x: 70, y: 70, z: 70 },
            { x: -70, y: 70, z: 70 },
          ];

          const cubeEdges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7],
          ];

          const projected = cubeVertices.map((v) => project3D(v.x, v.y, v.z, angle * 0.7, angle));

          // Draw 3D Wireframe Edges
          ctx.strokeStyle = "#E44D26";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#E44D26";
          ctx.shadowBlur = 12;

          cubeEdges.forEach(([start, end]) => {
            ctx.beginPath();
            ctx.moveTo(projected[start].x, projected[start].y);
            ctx.lineTo(projected[end].x, projected[end].y);
            ctx.stroke();
          });
          ctx.shadowBlur = 0;

          // Glowing 3D Vertices
          projected.forEach((p, i) => {
            ctx.fillStyle = i % 2 === 0 ? "#FFCB6B" : "#82AAFF";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 6 * p.scale, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.fillStyle = "#FFCB6B";
          ctx.font = "bold 13px monospace";
          ctx.fillText(`3D PERSPECTIVE MATRIX | ROT: ${Math.round(angle % 360)}°`, 20, 50);
          ctx.fillStyle = "#28C840";
          ctx.fillText("REAL-TIME 3D PERSPECTIVE PROJECTION", 20, 240);
        }
        // 3D Spatial Binary Tree (Reel ID 10)
        else if (activeReel.id === 10) {
          const treeNodes = [
            { id: "ROOT", x: 0, y: -100, z: 0 },
            { id: "L1", x: -80, y: -20, z: -50 },
            { id: "R1", x: 80, y: -20, z: 50 },
            { id: "L2_1", x: -130, y: 60, z: -90 },
            { id: "L2_2", x: -30, y: 60, z: -20 },
            { id: "R2_1", x: 30, y: 60, z: 20 },
            { id: "R2_2", x: 130, y: 60, z: 90 },
          ];

          const edges = [
            [0, 1], [0, 2],
            [1, 3], [1, 4],
            [2, 5], [2, 6],
          ];

          const projectedNodes = treeNodes.map((n) => ({
            ...n,
            proj: project3D(n.x, n.y, n.z, 25, angle * 0.8),
          }));

          // Draw Glowing 3D Connectors
          ctx.strokeStyle = "rgba(130, 170, 255, 0.6)";
          ctx.lineWidth = 2;
          edges.forEach(([parent, child]) => {
            ctx.beginPath();
            ctx.moveTo(projectedNodes[parent].proj.x, projectedNodes[parent].proj.y);
            ctx.lineTo(projectedNodes[child].proj.x, projectedNodes[child].proj.y);
            ctx.stroke();
          });

          // Draw 3D Spherical Nodes
          projectedNodes.forEach((n, idx) => {
            const isTarget = idx === Math.floor((angle / 30) % treeNodes.length);
            ctx.fillStyle = isTarget ? "#28C840" : "#E44D26";
            ctx.shadowColor = isTarget ? "#28C840" : "#E44D26";
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(n.proj.x, n.proj.y, 14 * n.proj.scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 10px monospace";
            ctx.fillText(n.id, n.proj.x - 10, n.proj.y + 3);
          });

          ctx.fillStyle = "#82AAFF";
          ctx.font = "bold 13px monospace";
          ctx.fillText("3D SPATIAL BINARY TREE TRAVERSAL", 20, 50);
        }
        // 3D Neural Attention Mesh (Reel ID 11)
        else if (activeReel.id === 11) {
          const layers = [-120, 0, 120];
          ctx.strokeStyle = "rgba(228, 77, 38, 0.4)";
          ctx.lineWidth = 1.5;

          for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
              const p1 = project3D(-100, -80 + i * 50, layers[0], 20, angle * 0.6);
              const p2 = project3D(0, -80 + j * 50, layers[1], 20, angle * 0.6);
              const p3 = project3D(100, -80 + i * 50, layers[2], 20, angle * 0.6);

              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.lineTo(p3.x, p3.y);
              ctx.stroke();
            }
          }

          ctx.fillStyle = "#FFCB6B";
          ctx.font = "bold 13px monospace";
          ctx.fillText("3D TRANSFORMER MULTI-HEAD ATTENTION", 20, 50);
        }
        // 3D Distributed Cluster (Reel ID 12)
        else if (activeReel.id === 12) {
          const servers = [
            { x: -90, z: -60, color: "#E44D26" },
            { x: 0, z: -60, color: "#28C840" },
            { x: 90, z: -60, color: "#82AAFF" },
            { x: -45, z: 60, color: "#FFCB6B" },
            { x: 45, z: 60, color: "#E44D26" },
          ];

          servers.forEach((s) => {
            const topP = project3D(s.x, -30, s.z, 30, angle * 0.5);
            const botP = project3D(s.x, 30, s.z, 30, angle * 0.5);

            ctx.fillStyle = s.color;
            ctx.shadowColor = s.color;
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(topP.x, topP.y, 18 * topP.scale, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.beginPath();
            ctx.moveTo(topP.x, topP.y);
            ctx.lineTo(botP.x, botP.y);
            ctx.stroke();
          });

          ctx.fillStyle = "#28C840";
          ctx.font = "bold 13px monospace";
          ctx.fillText("3D ISOMETRIC LOAD BALANCER CLUSTER", 20, 50);
        }
        // Fallback 2D Code Visualizer (Reels 1-8)
        else {
          ctx.fillStyle = "#82AAFF";
          ctx.font = "bold 13px monospace";
          ctx.fillText(`EXECUTING: ${activeReel.topic.toUpperCase()}`, 20, 50);

          ctx.strokeStyle = "#E44D26";
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x < canvas.width; x += 5) {
            const y = 140 + Math.sin(x * 0.05 + angle * 0.1) * 25;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.fillStyle = "#28C840";
          ctx.font = "11px monospace";
          ctx.fillText(`PROGRESS: ${Math.round(progress)}% | REEL ACTIVE`, 20, 240);
        }

        if (playing) {
          animFrame = requestAnimationFrame(renderCanvasFrame);
        }
      };

      renderCanvasFrame();
    }
    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [viewMode, activeIdx, progress, playing, playbackSpeed, activeReel]);

  // Speech Synthesis & Progress Timer
  useEffect(() => {
    let interval: any;
    if (playing) {
      const stepTime = 1000 / playbackSpeed;
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setActiveIdx((prev) => (prev + 1) % filteredReels.length);
            return 0;
          }
          return p + 2;
        });
      }, stepTime);

      // Speech narration
      if (!muted && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
        const textToSay =
          translations[activeReel?.id]?.[selectedLang.langKey] || activeReel?.title || "";
        const utterance = new SpeechSynthesisUtterance(textToSay);
        utterance.rate = playbackSpeed;
        utterance.lang = selectedLang.code;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [playing, activeIdx, muted, selectedLang, playbackSpeed, filteredReels.length, activeReel?.id]);

  const handleTogglePlay = () => {
    soundFx.playClick();
    setPlaying(!playing);
  };

  const handleToggleLike = () => {
    if (!activeReel) return;
    soundFx.playSuccess();
    const newLiked = !likedMap[activeReel.id];
    setLikedMap((prev) => ({ ...prev, [activeReel.id]: newLiked }));
    setLikesCountMap((prev) => ({
      ...prev,
      [activeReel.id]: (prev[activeReel.id] ?? activeReel.likes) + (newLiked ? 1 : -1),
    }));
    showToast(newLiked ? "Liked 3D Reel! ❤️" : "Unliked Reel");
  };

  const handleToggleSave = () => {
    if (!activeReel) return;
    soundFx.playClick();
    const newSaved = !savedMap[activeReel.id];
    setSavedMap((prev) => ({ ...prev, [activeReel.id]: newSaved }));
    showToast(newSaved ? "Saved to Bookmarks 🔖" : "Removed from Bookmarks");
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || !activeReel) return;
    soundFx.playSuccess();

    const createdComment: CommentItem = {
      id: Date.now(),
      user: "Manthan Mandavkar",
      avatar: "MM",
      text: newCommentText.trim(),
      time: "Just now",
      likes: 0,
    };

    setReelsList((prev) =>
      prev.map((r) =>
        r.id === activeReel.id
          ? {
              ...r,
              commentsCount: r.commentsCount + 1,
              comments: [createdComment, ...r.comments],
            }
          : r
      )
    );

    setNewCommentText("");
    showToast("Comment posted!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playSuccess();
      setUploadedFileName(file.name);
    }
  };

  const handlePublishReel = () => {
    if (!newTitle.trim()) return;
    soundFx.playSuccess();

    const createdReel: ReelItem = {
      id: Date.now(),
      title: newTitle,
      creator: "Manthan Mandavkar",
      avatar: "MM",
      role: "3D Developer",
      topic: newTopic,
      category: newCategory,
      is3D: true,
      views: 1,
      likes: 1,
      commentsCount: 0,
      duration: "0:45",
      hashtags: ["#codecampus", "#3d", `#${newCategory.toLowerCase()}`],
      codeSnippet: newCode,
      comments: [],
    };

    setReelsList([createdReel, ...reelsList]);
    setActiveIdx(0);
    setUploadModalOpen(false);
    setNewTitle("");
    setUploadedFileName(null);
    showToast("3D Reel Published to Community! 🚀");
  };

  const handleCopyCode = () => {
    if (!activeReel?.codeSnippet) return;
    soundFx.playClick();
    navigator.clipboard.writeText(activeReel.codeSnippet);
    showToast("Code snippet copied to clipboard! 📋");
  };

  const handleTryInIDE = () => {
    soundFx.playSuccess();
    const problemId = activeReel?.problemId || 1;
    navigate(`/ide/${problemId}`);
  };

  return (
    <DashboardLayout role="student">
      <div className="min-h-screen bg-[#09090D] text-white p-3 md:p-6 flex flex-col items-center justify-center relative font-sans select-none">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 z-50 bg-[#E44D26] text-white px-5 py-2.5 rounded-full font-mono text-xs font-bold shadow-2xl animate-bounce border border-white/20">
            {toastMessage}
          </div>
        )}

        {/* Top Control Bar: Search & Category Chips */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-3 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-wider text-white uppercase">REELS</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E44D26] animate-ping"></span>
              <span className="text-[10px] font-mono text-[#FFCB6B] border border-[#FFCB6B]/30 px-2 py-0.5 rounded-full font-bold">
                {filteredReels.length} Reels
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Picker */}
              <div className="bg-white/10 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/15 flex items-center gap-1.5 text-xs">
                <span className="text-xs">{selectedLang.flag}</span>
                <select
                  value={selectedLang.code}
                  onChange={(e) => {
                    soundFx.playClick();
                    const found = languages.find((l) => l.code === e.target.value);
                    if (found) setSelectedLang(found);
                  }}
                  className="bg-transparent text-[11px] font-bold text-white focus:outline-none cursor-pointer"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code} className="bg-[#0D0D0D] text-white">
                      {l.flag} {l.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mute Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMuted(!muted);
                }}
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-sm hover:bg-white/20 transition-all"
                title="Toggle Narration Audio"
              >
                {muted ? "🔇" : "🔊"}
              </button>

              {/* Create Reel Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setUploadModalOpen(true);
                }}
                className="bg-[#E44D26] text-white text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-all shadow-lg font-mono flex items-center gap-1"
              >
                <span>+</span> Create
              </button>
            </div>
          </div>

          {/* Search Bar & Category Selector */}
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIdx(0);
              }}
              placeholder="🔍 Search 3D reels by topic, code, tag, or creator..."
              className="w-full bg-white/5 border border-white/15 rounded-full px-4 py-2 text-xs font-mono text-white placeholder-white/40 focus:outline-none focus:border-[#E44D26]"
            />

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {["All", "3D Graphics", "DSA", "System Design", "Frontend", "Algorithms", "Saved"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedCategory(cat);
                    setActiveIdx(0);
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#E44D26] text-white shadow-md scale-105"
                      : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat === "3D Graphics" ? "🧊 3D Graphics" : cat === "Saved" ? "🔖 Saved" : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 9:16 Vertical Reel Player Container */}
        {filteredReels.length === 0 ? (
          <div className="w-full max-w-md h-[600px] bg-white/5 border border-white/10 rounded-[32px] flex flex-col items-center justify-center p-6 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-mono font-bold text-base text-white">No Reels Found</h3>
            <p className="text-xs text-white/50 font-mono mt-1 mb-4">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-[#E44D26] text-white text-xs font-mono font-bold px-4 py-2 rounded-full"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative w-full max-w-md rounded-[36px] overflow-hidden border-4 border-[#22222B] shadow-2xl bg-black h-[640px] flex flex-col justify-between">
            
            {/* Reel Header Info Overlay */}
            <div className="absolute top-3 inset-x-3 z-30 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-[10px] font-mono text-[#E44D26] font-bold uppercase">{activeReel.category}</span>
                <span className="text-white/30 text-[10px]">|</span>
                <span className="text-[10px] font-mono text-white/80">{activeReel.topic}</span>
              </div>

              {/* Video / 3D Canvas Switcher & Speed Pill */}
              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setViewMode(viewMode === "canvas" ? "video" : "canvas");
                  }}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full transition-all ${
                    viewMode === "canvas" ? "bg-[#E44D26] text-white font-bold" : "text-white/70"
                  }`}
                  title="Switch View Mode"
                >
                  {viewMode === "canvas" ? (activeReel.is3D ? "🧊 3D Canvas" : "⚡ Canvas") : "📹 Video"}
                </button>

                <select
                  value={playbackSpeed}
                  onChange={(e) => {
                    soundFx.playClick();
                    setPlaybackSpeed(parseFloat(e.target.value));
                  }}
                  className="bg-transparent text-[10px] font-mono text-white font-bold focus:outline-none cursor-pointer px-1"
                >
                  <option value="0.5" className="bg-[#0D0D0D]">0.5x</option>
                  <option value="1.0" className="bg-[#0D0D0D]">1.0x</option>
                  <option value="1.25" className="bg-[#0D0D0D]">1.25x</option>
                  <option value="1.5" className="bg-[#0D0D0D]">1.5x</option>
                  <option value="2.0" className="bg-[#0D0D0D]">2.0x</option>
                </select>
              </div>
            </div>

            {/* Top Reel Progress Bar */}
            <div className="absolute top-1 inset-x-3 h-1 bg-white/20 rounded-full overflow-hidden z-40">
              <div
                className="h-full bg-[#E44D26] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Media Viewport (HTML5 Video or 3D Animated Canvas) */}
            <div className="absolute inset-0 bg-black cursor-pointer" onClick={handleTogglePlay}>
              {viewMode === "video" && activeReel.videoUrl ? (
                <video
                  ref={videoRef}
                  src={activeReel.videoUrl}
                  autoPlay={playing}
                  loop
                  muted={muted}
                  playsInline
                  className="w-full h-full object-cover contrast-[1.05]"
                />
              ) : (
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={640}
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none"></div>

              {/* 3D Floating Code Card */}
              <div className="absolute inset-x-3 top-14 z-20 pointer-events-auto">
                <div className="bg-[#0D0D14]/90 backdrop-blur-xl rounded-2xl p-3.5 border border-white/15 shadow-2xl font-mono text-left">
                  <div className="text-[#FFCB6B] text-[10px] font-bold mb-1.5 flex items-center justify-between border-b border-white/10 pb-1">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#28C840] animate-ping"></span>
                      {`// ${activeReel.title}`}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyCode();
                      }}
                      className="text-[9px] bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded font-mono"
                    >
                      📋 Copy
                    </button>
                  </div>

                  <p className="text-white text-[11px] leading-snug mb-2 italic bg-white/5 p-2 rounded-lg border border-white/10 font-sans font-medium">
                    "{translations[activeReel.id]?.[selectedLang.langKey] || activeReel.title}"
                  </p>

                  {activeReel.codeSnippet && (
                    <pre className="text-[#82AAFF] text-[9px] leading-4 overflow-x-auto max-h-36 whitespace-pre-wrap font-mono bg-black/90 p-2.5 rounded-lg border border-white/10 font-medium">
                      {activeReel.codeSnippet}
                    </pre>
                  )}
                </div>
              </div>

              {/* Play/Pause Overlay Indicator */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
                  <div className="w-16 h-16 rounded-full bg-[#E44D26] text-white flex items-center justify-center text-2xl font-bold shadow-2xl scale-110 animate-pulse">
                    ▶
                  </div>
                </div>
              )}
            </div>

            {/* Right Action Column */}
            <div className="absolute right-3 bottom-16 flex flex-col items-center gap-4 z-30">
              {/* Like Button */}
              <button onClick={handleToggleLike} className="flex flex-col items-center group">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border text-xl transition-transform active:scale-125 ${
                  isLiked ? "bg-[#E44D26] border-[#E44D26] text-white shadow-lg" : "bg-black/50 border-white/20 text-white"
                }`}>
                  {isLiked ? "❤️" : "🤍"}
                </div>
                <span className="text-white text-[10px] font-mono font-bold mt-1 shadow-sm">
                  {currentLikes.toLocaleString()}
                </span>
              </button>

              {/* Comments Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setCommentsOpen(true);
                }}
                className="flex flex-col items-center group"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white text-lg hover:border-[#E44D26] transition-all">
                  💬
                </div>
                <span className="text-white text-[10px] font-mono font-bold mt-1">
                  {activeReel.commentsCount}
                </span>
              </button>

              {/* Bookmark Save Button */}
              <button onClick={handleToggleSave} className="flex flex-col items-center group">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border text-lg transition-all ${
                  isSaved ? "bg-[#FFCB6B] text-black border-[#FFCB6B]" : "bg-black/50 border-white/20 text-white"
                }`}>
                  {isSaved ? "🔖" : "🏷️"}
                </div>
                <span className="text-white text-[10px] font-mono font-bold mt-1">
                  {isSaved ? "Saved" : "Save"}
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShareModalOpen(true);
                }}
                className="flex flex-col items-center group"
              >
                <div className="w-11 h-11 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/20 text-white text-lg hover:border-white transition-all">
                  🚀
                </div>
                <span className="text-white text-[10px] font-mono font-bold mt-1">Share</span>
              </button>
            </div>

            {/* Bottom Creator & IDE Bar */}
            <div className="absolute bottom-3 left-4 right-16 z-30 text-white text-left pointer-events-auto">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-[#E44D26] text-white font-mono font-bold text-xs flex items-center justify-center border border-white/30 shadow-md">
                  {activeReel.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs font-mono">{activeReel.creator}</span>
                    <span className="text-[8px] bg-[#28C840] text-black px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                      3D GRAPHICS ARCHITECT
                    </span>
                  </div>
                  <div className="text-[9px] text-white/60 font-mono">{activeReel.role}</div>
                </div>
              </div>

              <p className="text-xs font-bold text-white/95 font-mono line-clamp-1 mb-1">{activeReel.title}</p>

              {/* Hashtags & Try in IDE Action */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1 text-[9px] font-mono text-[#82AAFF] overflow-x-auto scrollbar-none">
                  {activeReel.hashtags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <button
                  onClick={handleTryInIDE}
                  className="bg-[#28C840] text-black font-mono font-bold text-[10px] px-3 py-1 rounded-full hover:bg-white transition-all whitespace-nowrap shadow-lg flex items-center gap-1"
                >
                  <span>⚡</span> Try in IDE
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Reel Stepper Buttons */}
        <div className="flex items-center gap-4 mt-4 z-30">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveIdx((prev) => (prev > 0 ? prev - 1 : filteredReels.length - 1));
              setProgress(0);
            }}
            disabled={filteredReels.length <= 1}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-xs font-mono font-bold disabled:opacity-40 transition-all border border-white/10"
          >
            ← PREV REEL
          </button>
          
          <span className="text-white/60 text-xs font-mono font-bold">
            {filteredReels.length > 0 ? `${activeIdx + 1} / ${filteredReels.length}` : "0 / 0"}
          </span>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveIdx((prev) => (prev + 1) % filteredReels.length);
              setProgress(0);
            }}
            disabled={filteredReels.length <= 1}
            className="bg-[#E44D26] hover:bg-white hover:text-black text-white px-4 py-2 rounded-full text-xs font-mono font-bold disabled:opacity-40 transition-all shadow-md"
          >
            NEXT REEL →
          </button>
        </div>

        {/* Comments Side Drawer / Modal */}
        {commentsOpen && activeReel && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4">
            <div className="bg-[#0D0D14] border border-white/20 rounded-t-3xl md:rounded-3xl max-w-md w-full max-h-[85vh] h-full p-5 text-white shadow-2xl flex flex-col justify-between relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-lg uppercase tracking-wider">COMMENTS</h3>
                  <span className="text-xs font-mono text-[#E44D26] font-bold">({activeReel.commentsCount})</span>
                </div>
                <button
                  onClick={() => setCommentsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white font-mono flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              {/* Comments Feed List */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3 font-mono text-xs pr-1">
                {activeReel.comments.length === 0 ? (
                  <div className="text-center py-8 text-white/40">No comments yet. Be the first to comment!</div>
                ) : (
                  activeReel.comments.map((c) => (
                    <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl p-3 flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-[#E44D26] text-white font-bold flex items-center justify-center shrink-0">
                        {c.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-[11px]">{c.user}</span>
                          <span className="text-[9px] text-white/40">{c.time}</span>
                        </div>
                        <p className="text-white/80 leading-relaxed font-sans text-xs">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Add a comment or ask a code question..."
                  className="flex-1 bg-black border border-white/20 rounded-full px-4 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E44D26]"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newCommentText.trim()}
                  className="bg-[#E44D26] text-white px-4 py-2.5 rounded-full font-mono font-bold text-xs hover:bg-white hover:text-black disabled:opacity-40 transition-all"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Reel Modal */}
        {shareModalOpen && activeReel && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0D0D14] border border-white/20 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl relative text-center">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="font-display font-black text-lg uppercase tracking-wider">SHARE REEL</h3>
                <button
                  onClick={() => setShareModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white font-mono flex items-center justify-center hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-[#E44D26]/20 border border-[#E44D26] text-[#E44D26] text-3xl flex items-center justify-center mx-auto mb-3">
                🚀
              </div>
              <h4 className="font-mono font-bold text-sm text-white mb-1">{activeReel.title}</h4>
              <p className="text-xs text-white/60 font-mono mb-4">Share this interactive 3D DSA reel with your peers!</p>

              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast("Reel link copied! 🔗");
                    setShareModalOpen(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl font-bold flex flex-col items-center gap-1 border border-white/10"
                >
                  <span className="text-lg">🔗</span>
                  Copy Link
                </button>

                <button
                  onClick={() => {
                    handleCopyCode();
                    setShareModalOpen(false);
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl font-bold flex flex-col items-center gap-1 border border-white/10"
                >
                  <span className="text-lg">📋</span>
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Reel Video Modal */}
        {uploadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
            <div className="bg-[#0D0D14] border border-white/20 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <h3 className="font-display font-black text-xl uppercase">UPLOAD 3D / TECH REEL VIDEO</h3>
                <button
                  onClick={() => setUploadModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 text-white font-mono flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              {/* Video File Dropzone */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="video/mp4,video/quicktime,video/webm"
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 hover:border-[#E44D26] rounded-2xl p-6 text-center cursor-pointer bg-black/60 mb-4 transition-all"
              >
                <div className="text-3xl mb-2">📹</div>
                <div className="text-xs font-mono font-bold text-white uppercase">
                  {uploadedFileName ? `SELECTED: ${uploadedFileName}` : "CLICK TO BROWSE OR DRAG MP4 VIDEO"}
                </div>
                <div className="text-[10px] font-mono text-white/50 mt-1">9:16 Vertical Format Supported (Max 50MB)</div>
              </div>

              {/* Title & Category Input */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[10px] font-mono font-bold text-[#E44D26] uppercase block mb-1">REEL TITLE</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. 3D Spatial Mesh Engine"
                    className="w-full bg-black border border-white/15 rounded-xl p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E44D26]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono font-bold text-[#E44D26] uppercase block mb-1">CATEGORY</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full bg-black border border-white/15 rounded-xl p-2.5 text-xs font-mono text-white focus:outline-none focus:border-[#E44D26]"
                  >
                    <option value="3D Graphics">3D Graphics</option>
                    <option value="DSA">DSA</option>
                    <option value="System Design">System Design</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Algorithms">Algorithms</option>
                  </select>
                </div>
              </div>

              {/* Code Snippet Input */}
              <div className="mb-4">
                <label className="text-[10px] font-mono font-bold text-[#E44D26] uppercase block mb-1">LESSON CODE SNIPPET</label>
                <textarea
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full h-24 bg-black border border-white/15 rounded-xl p-3 text-xs font-mono text-[#82AAFF] focus:outline-none resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handlePublishReel}
                disabled={!newTitle.trim()}
                className="w-full bg-[#E44D26] text-white font-mono font-bold py-3.5 rounded-full text-xs uppercase tracking-widest hover:bg-white hover:text-black disabled:opacity-50 transition-all shadow-xl"
              >
                PUBLISH REEL TO COMMUNITY →
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

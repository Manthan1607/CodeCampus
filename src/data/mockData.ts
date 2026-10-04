export const students = [
  { id: 1, name: "Manthan Mandavkar", avatar: "MM", college: "IIT Delhi", xp: 8420, rank: 12, streak: 47, rating: 1847, skills: ["Arrays", "Trees", "System Design"], location: "Delhi", available: true, submitted: 312, solved: 189 },
  { id: 2, name: "Rohan Mehta", avatar: "RM", college: "NIT Trichy", xp: 7130, rank: 28, streak: 23, rating: 1654, skills: ["Graphs", "Strings", "DP"], location: "Chennai", available: true, submitted: 258, solved: 154 },
  { id: 3, name: "Ananya Patel", avatar: "AP", college: "BITS Pilani", xp: 9200, rank: 7, streak: 62, rating: 1923, skills: ["System Design", "Trees", "Heaps"], location: "Pilani", available: false, submitted: 421, solved: 267 },
  { id: 4, name: "Vikram Singh", avatar: "VS", college: "IIT Bombay", xp: 11500, rank: 3, streak: 89, rating: 2134, skills: ["DP", "Graphs", "Math"], location: "Mumbai", available: true, submitted: 589, solved: 378 },
  { id: 5, name: "Shreya Nair", avatar: "SN", college: "IIT Madras", xp: 6800, rank: 34, streak: 18, rating: 1542, skills: ["Arrays", "Sorting", "Binary Search"], location: "Chennai", available: true, submitted: 187, solved: 112 },
  { id: 6, name: "Arjun Kumar", avatar: "AK", college: "DTU", xp: 5400, rank: 67, streak: 11, rating: 1341, skills: ["Strings", "Arrays", "Recursion"], location: "Delhi", available: false, submitted: 143, solved: 89 },
];

export const problems = [
  { id: 1, title: "Design LRU Cache", difficulty: "Medium", tags: ["Hash Map", "Doubly-Linked List"], acceptance: 68.4, submissions: 58910, solved: true, points: 20 },
  { id: 2, title: "Token Bucket Rate Limiter", difficulty: "Medium", tags: ["System Design", "Concurrency"], acceptance: 54.1, submissions: 32420, solved: true, points: 25 },
  { id: 3, title: "Consistent Hashing Ring", difficulty: "Hard", tags: ["Distributed Systems", "Binary Search"], acceptance: 31.8, submissions: 14870, solved: false, points: 40 },
  { id: 4, title: "Concurrent Task Scheduler", difficulty: "Medium", tags: ["Threads", "Queue"], acceptance: 56.2, submissions: 29340, solved: true, points: 20 },
  { id: 5, title: "Distributed Transaction Saga Log", difficulty: "Hard", tags: ["Database", "State Machine"], acceptance: 24.7, submissions: 11210, solved: false, points: 40 },
  { id: 6, title: "Two Sum Optimal Pass", difficulty: "Easy", tags: ["Arrays", "Hash Map"], acceptance: 74.3, submissions: 92640, solved: true, points: 10 },
];

export const courses = [
  { id: 1, title: "DSA Foundations", instructor: "Dr. Anita Roy", progress: 78, total: 24, completed: 18, category: "DSA", enrolled: 12400, rating: 4.8 },
  { id: 2, title: "System Design Masterclass", instructor: "Ravi Shankar", progress: 42, total: 18, completed: 7, category: "System Design", enrolled: 8900, rating: 4.9 },
  { id: 3, title: "Advanced Algorithms", instructor: "Prof. Sameer Jain", progress: 15, total: 30, completed: 4, category: "Algorithms", enrolled: 6700, rating: 4.7 },
];

export const dsaTopics = [
  { id: "arrays", label: "Arrays", status: "mastered", x: 80, y: 120, deps: [] },
  { id: "strings", label: "Strings", status: "mastered", x: 240, y: 120, deps: [] },
  { id: "sorting", label: "Sorting", status: "mastered", x: 160, y: 220, deps: ["arrays"] },
  { id: "binary-search", label: "Binary Search", status: "completed", x: 80, y: 320, deps: ["sorting"] },
  { id: "two-pointers", label: "Two Pointers", status: "completed", x: 240, y: 320, deps: ["arrays", "strings"] },
  { id: "sliding-window", label: "Sliding Window", status: "active", x: 380, y: 220, deps: ["arrays", "strings"] },
  { id: "linked-list", label: "Linked List", status: "active", x: 80, y: 420, deps: ["binary-search"] },
  { id: "stack", label: "Stack & Queue", status: "locked", x: 240, y: 420, deps: ["two-pointers"] },
  { id: "tree", label: "Binary Trees", status: "locked", x: 160, y: 520, deps: ["linked-list", "stack"] },
  { id: "heap", label: "Heaps", status: "locked", x: 380, y: 420, deps: ["sliding-window"] },
  { id: "graph", label: "Graphs", status: "locked", x: 80, y: 620, deps: ["tree"] },
  { id: "dp", label: "Dynamic Programming", status: "locked", x: 300, y: 580, deps: ["stack", "heap"] },
];

export const mentors = [
  { id: 1, name: "Dr. Anita Roy", avatar: "AR", specialization: "Algorithms & Data Structures", rating: 4.9, sessions: 142, college: "IIT Bombay", online: true },
  { id: 2, name: "Rahul Verma", avatar: "RV", specialization: "System Design & Backend", rating: 4.8, sessions: 98, college: "Google SWE", online: false },
  { id: 3, name: "Pooja Iyer", avatar: "PI", specialization: "Frontend & Web Dev", rating: 4.7, sessions: 67, college: "Meta SWE", online: true },
];

export const notifications = [
  { id: 1, type: "battle", message: "Vikram Singh challenged you to a 1v1 battle!", time: "2m ago", read: false },
  { id: 2, type: "submission", message: "Solution for 'LRU Cache' accepted! (12ms, 8.4MB)", time: "15m ago", read: false },
  { id: 3, type: "mentor", message: "Session with Dr. Anita Roy starts in 30 minutes.", time: "28m ago", read: false },
  { id: 4, type: "badge", message: "Earned 'Streak Master' badge for 47 consecutive days", time: "1h ago", read: true },
  { id: 5, type: "course", message: "New lesson available: 'Advanced Graph Traversal'", time: "3h ago", read: true },
  { id: 6, type: "system", message: "Weekly leaderboard updated. Rank #12 maintained.", time: "1d ago", read: true },
];

export const leaderboard = [
  { rank: 1, name: "Aryan Gupta", college: "IIT Bombay", xp: 24560, rating: 2412, streak: 124, solved: 634 },
  { rank: 2, name: "Nisha Kaur", college: "IIT Delhi", xp: 22130, rating: 2289, streak: 98, solved: 589 },
  { rank: 3, name: "Vikram Singh", college: "IIT Bombay", xp: 20870, rating: 2134, streak: 89, solved: 532 },
  { rank: 4, name: "Deepa Menon", college: "IIT Madras", xp: 19200, rating: 2067, streak: 72, solved: 498 },
  { rank: 5, name: "Sanjay Kumar", college: "NIT Trichy", xp: 17800, rating: 1987, streak: 61, solved: 467 },
  { rank: 6, name: "Kavya Reddy", college: "BITS Pilani", xp: 16540, rating: 1934, streak: 54, solved: 445 },
  { rank: 7, name: "Ananya Patel", college: "BITS Pilani", xp: 15900, rating: 1923, streak: 62, solved: 421 },
  { rank: 8, name: "Mohit Sharma", college: "DTU", xp: 14320, rating: 1876, streak: 48, solved: 398 },
];

export const reels = [
  { id: 1, title: "Two Pointer Technique Explained", creator: "Vikram Singh", avatar: "VS", topic: "Arrays", views: 12400, likes: 843, duration: "1:12", thumbnail: "bg-blue-900" },
  { id: 2, title: "Why Recursion Base Cases Matter", creator: "Priya Sharma", avatar: "PS", topic: "Recursion", views: 9200, likes: 612, duration: "0:58", thumbnail: "bg-purple-900" },
  { id: 3, title: "BFS vs DFS Traversal Comparison", creator: "Dr. Anita Roy", avatar: "AR", topic: "Graphs", views: 18700, likes: 1240, duration: "1:30", thumbnail: "bg-teal-900" },
];

export const submissionHistory = [
  { date: "2024-01-15", accepted: 3, wrong: 1, tle: 0 },
  { date: "2024-01-16", accepted: 2, wrong: 2, tle: 1 },
  { date: "2024-01-17", accepted: 4, wrong: 0, tle: 0 },
  { date: "2024-01-18", accepted: 1, wrong: 3, tle: 1 },
  { date: "2024-01-19", accepted: 5, wrong: 1, tle: 0 },
  { date: "2024-01-20", accepted: 3, wrong: 2, tle: 0 },
  { date: "2024-01-21", accepted: 6, wrong: 0, tle: 1 },
  { date: "2024-01-22", accepted: 2, wrong: 4, tle: 0 },
  { date: "2024-01-23", accepted: 7, wrong: 1, tle: 0 },
  { date: "2024-01-24", accepted: 4, wrong: 2, tle: 1 },
  { date: "2024-01-25", accepted: 8, wrong: 0, tle: 0 },
  { date: "2024-01-26", accepted: 5, wrong: 1, tle: 0 },
  { date: "2024-01-27", accepted: 3, wrong: 3, tle: 1 },
  { date: "2024-01-28", accepted: 9, wrong: 0, tle: 0 },
];

export const xpData = [
  { week: "W1", xp: 340 },
  { week: "W2", xp: 520 },
  { week: "W3", xp: 290 },
  { week: "W4", xp: 680 },
  { week: "W5", xp: 850 },
  { week: "W6", xp: 620 },
  { week: "W7", xp: 940 },
  { week: "W8", xp: 1120 },
];

export const colleges = [
  { rank: 1, name: "IIT Bombay", students: 487, avgRating: 1842, topSolver: "Aryan Gupta", solved: 91240 },
  { rank: 2, name: "IIT Delhi", students: 412, avgRating: 1798, topSolver: "Nisha Kaur", solved: 84320 },
  { rank: 3, name: "IIT Madras", students: 398, avgRating: 1734, topSolver: "Deepa Menon", solved: 79870 },
  { rank: 4, name: "NIT Trichy", students: 524, avgRating: 1612, topSolver: "Sanjay Kumar", solved: 72440 },
  { rank: 5, name: "BITS Pilani", students: 445, avgRating: 1589, topSolver: "Ananya Patel", solved: 68920 },
];

export const twoSumCode = `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.count(complement)) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};`;

export const twoSumProblem = {
  title: "Design LRU Cache",
  difficulty: "Medium",
  points: 20,
  acceptance: "68.4%",
  description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size \`capacity\`.
- \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`void put(int key, int value)\` Update the value of the \`key\` if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in **O(1)** average time complexity.`,
  examples: [
    {
      input: `["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]`,
      output: `[null, null, null, 1, null, -1, null, -1, 3, 4]`,
      explanation: `LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)`,
    },
  ],
  constraints: [
    "1 ≤ capacity ≤ 3000",
    "0 ≤ key ≤ 10⁴",
    "0 ≤ value ≤ 10⁵",
    "At most 2 • 10⁵ calls will be made to get and put.",
  ],
  testCases: [
    { input: "LRUCache(2), put(1,1), put(2,2), get(1)", expected: "1" },
    { input: "put(3,3), get(2)", expected: "-1" },
    { input: "put(4,4), get(1), get(3), get(4)", expected: "[-1, 3, 4]" },
  ],
};

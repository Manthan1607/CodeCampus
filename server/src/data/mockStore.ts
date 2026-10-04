export const mockProblems = [
  {
    problemId: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tags: ["Arrays", "Hash Map"],
    acceptance: "72.4%",
    submissionsCount: 42310,
    solvedCount: 30600,
    points: 10,
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    testCases: [
      { input: "[2,7,11,15]\n9", expected: "[0,1]" },
      { input: "[3,2,4]\n6", expected: "[1,2]" }
    ],
    initialCode: {
      cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> map;\n        for (int i = 0; i < nums.size(); i++) {\n            int comp = target - nums[i];\n            if (map.count(comp)) return {map[comp], i};\n            map[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      python: "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen:\n                return [seen[target - n], i]\n            seen[n] = i\n        return []",
      javascript: "function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}"
    }
  },
  {
    problemId: 2,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    tags: ["String", "DP"],
    acceptance: "33.1%",
    submissionsCount: 18920,
    solvedCount: 6200,
    points: 20,
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [{ input: "s = 'babad'", output: "'bab'" }],
    constraints: ["1 <= s.length <= 1000"],
    testCases: [{ input: "'babad'", expected: "'bab'" }],
    initialCode: { cpp: "", python: "", javascript: "" }
  }
];

export const mockUsers = [
  { id: 1, name: "Priya Sharma", avatar: "PS", college: "IIT Delhi", xp: 8420, rank: 12, streak: 47, rating: 1847, skills: ["Arrays", "Trees", "DP"], location: "Delhi", available: true, submitted: 312, solved: 189 },
  { id: 2, name: "Rohan Mehta", avatar: "RM", college: "NIT Trichy", xp: 7130, rank: 28, streak: 23, rating: 1654, skills: ["Graphs", "Strings", "DP"], location: "Chennai", available: true, submitted: 258, solved: 154 },
  { id: 3, name: "Ananya Patel", avatar: "AP", college: "BITS Pilani", xp: 9200, rank: 7, streak: 62, rating: 1923, skills: ["System Design", "Trees", "Heaps"], location: "Pilani", available: false, submitted: 421, solved: 267 },
  { id: 4, name: "Vikram Singh", avatar: "VS", college: "IIT Bombay", xp: 11500, rank: 3, streak: 89, rating: 2134, skills: ["DP", "Graphs", "Math"], location: "Mumbai", available: true, submitted: 589, solved: 378 },
];

export const mockReels = [
  { reelId: 1, title: "Two Pointer Technique Explained", creator: "Vikram Singh", avatar: "VS", topic: "Arrays", views: 12400, likes: 843, duration: "1:12", thumbnail: "bg-blue-900" },
  { reelId: 2, title: "Why Recursion Feels Like Magic", creator: "Priya Sharma", avatar: "PS", topic: "Recursion", views: 9200, likes: 612, duration: "0:58", thumbnail: "bg-purple-900" }
];

export const mockCourses = [
  { courseId: 1, title: "DSA Foundations", instructor: "Dr. Anita Roy", progress: 78, total: 24, completed: 18, category: "DSA", enrolled: 12400, rating: 4.8 },
  { courseId: 2, title: "System Design Masterclass", instructor: "Ravi Shankar", progress: 42, total: 18, completed: 7, category: "System Design", enrolled: 8900, rating: 4.9 }
];

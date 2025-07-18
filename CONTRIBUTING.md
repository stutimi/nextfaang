# 🤝 Contributing to NEXTFAANG

Thank you for your interest in contributing to NEXTFAANG! We're excited to have you join our mission to transform competitive programming education in India.

## 🌟 Ways to Contribute

### 🐛 **Bug Reports**
- Use the GitHub issue tracker
- Include detailed reproduction steps
- Provide environment information
- Add screenshots if applicable

### 💡 **Feature Requests**
- Check existing issues first
- Describe the problem you're solving
- Explain your proposed solution
- Consider implementation complexity

### 🔧 **Code Contributions**
- Fix bugs and implement features
- Improve documentation
- Add tests for new functionality
- Optimize performance

### 📚 **Content Contributions**
- Add new algorithms to CP Dictionary
- Create tutorial content
- Improve existing explanations
- Translate content to other languages

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Git knowledge
- Basic understanding of React/TypeScript
- Familiarity with competitive programming (for content contributions)

### **Development Setup**

1. **Fork the repository**
```bash
# Click the "Fork" button on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/nextfaang-cp-legend-hub.git
cd nextfaang-cp-legend-hub
```

2. **Set up upstream remote**
```bash
git remote add upstream https://github.com/original-repo/nextfaang-cp-legend-hub.git
```

3. **Install dependencies**
```bash
npm install
```

4. **Environment setup**
```bash
cp .env.example .env.local
# Add your Supabase credentials (contact maintainers for dev keys)
```

5. **Start development server**
```bash
npm run dev
```

---

## 📋 Development Guidelines

### **Code Style**
- Use TypeScript for all new code
- Follow existing naming conventions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### **Component Structure**
```typescript
// Component file structure
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "./types";

interface Props {
  // Define props with clear types
}

export const ComponentName = ({ prop1, prop2 }: Props) => {
  // Component logic
  
  return (
    <div className="component-container">
      {/* JSX content */}
    </div>
  );
};
```

### **Styling Guidelines**
- Use Tailwind CSS classes
- Follow the existing design system
- Ensure dark/light mode compatibility
- Use CSS custom properties for theme-aware colors

### **File Organization**
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── arena/           # Coding arena specific components
│   └── [feature]/       # Feature-specific components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── integrations/        # External service integrations
└── types/               # TypeScript type definitions
```

---

## 🔄 Contribution Workflow

### **1. Create a Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### **2. Make Changes**
- Write clean, readable code
- Follow the existing patterns
- Add tests if applicable
- Update documentation

### **3. Test Your Changes**
```bash
# Run the development server
npm run dev

# Run linting
npm run lint

# Build the project
npm run build
```

### **4. Commit Changes**
```bash
# Use conventional commit format
git add .
git commit -m "feat: add new algorithm to CP dictionary"
# or
git commit -m "fix: resolve dark mode visibility issue"
```

### **Commit Message Format**
```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks
```

### **5. Push and Create PR**
```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Link to related issues
- Screenshots for UI changes
- Testing instructions

---

## 🧪 Testing Guidelines

### **Manual Testing**
- Test on different screen sizes
- Verify dark/light mode compatibility
- Check all interactive elements
- Test with different user scenarios

### **Code Review Checklist**
- [ ] Code follows style guidelines
- [ ] No console.log statements in production code
- [ ] Proper error handling
- [ ] Accessible UI components
- [ ] Performance considerations
- [ ] Security best practices

---

## 📚 Content Contribution Guidelines

### **CP Dictionary Entries**
When adding new algorithms or data structures:

```markdown
## Algorithm Name

### Description
Brief explanation of what the algorithm does.

### Time Complexity
- Best Case: O(...)
- Average Case: O(...)
- Worst Case: O(...)

### Space Complexity
O(...)

### Implementation
```cpp
// C++ implementation
```

```python
# Python implementation
```

### Use Cases
- When to use this algorithm
- Common problem patterns

### Related Problems
- [Problem Name](link)
- [Another Problem](link)
```

### **Tutorial Content**
- Use clear, beginner-friendly language
- Include practical examples
- Add visual diagrams when helpful
- Provide multiple language implementations

---

## 🎯 Priority Areas

### **High Priority**
- Bug fixes and stability improvements
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness

### **Medium Priority**
- New algorithm implementations
- Enhanced AI features
- Additional platform integrations
- UI/UX improvements

### **Low Priority**
- Advanced features
- Experimental functionality
- Nice-to-have enhancements

---

## 🏆 Recognition

### **Contributor Levels**
- **🌟 Contributor**: Made valuable contributions
- **⭐ Regular Contributor**: Consistent valuable contributions
- **🚀 Core Contributor**: Significant impact on the project
- **💎 Maintainer**: Trusted with project maintenance

### **Recognition Methods**
- GitHub contributor badge
- Mention in release notes
- Feature in community highlights
- Special Discord role

---

## 📞 Getting Help

### **Communication Channels**
- **GitHub Issues**: Bug reports and feature requests
- **Discord**: Real-time discussion and help
- **Email**: Direct contact with maintainers
- **Documentation**: Comprehensive guides and tutorials

### **Mentorship Program**
New contributors can request mentorship for:
- Understanding the codebase
- Learning best practices
- Guidance on first contributions
- Career advice in open source

---

## 📜 Code of Conduct

### **Our Standards**
- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different perspectives and experiences

### **Unacceptable Behavior**
- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Spam or off-topic content

### **Enforcement**
Violations will result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to: conduct@nextfaang.com

---

## 🎉 Thank You!

Every contribution, no matter how small, helps make NEXTFAANG better for the entire competitive programming community. We appreciate your time and effort in helping us build the future of coding education!

---

## 📋 Quick Reference

### **Useful Commands**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
git pull upstream main  # Sync with upstream
```

### **Important Files**
- `src/App.tsx` - Main application component
- `src/components/` - Reusable components
- `tailwind.config.ts` - Styling configuration
- `package.json` - Dependencies and scripts

### **Key Resources**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

---

*Happy Contributing! 🚀*
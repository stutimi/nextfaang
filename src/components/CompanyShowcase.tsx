
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, TrendingUp, Target, Heart } from "lucide-react";

export const CompanyShowcase = () => {
  const companies = [
    {
      name: "Google",
      image: "https://i.postimg.cc/rp3Jv16N/google-head-office-campus-mountain-view-californias-usa-E94-EK8.jpg",
      alt: "Google Campus",
      description: "Leading tech innovation",
      color: "from-blue-500 to-green-500",
      shape: "square"
    },
    {
      name: "Apple",
      image: "https://i.postimg.cc/Y9t92Vwr/apple-store.jpg",
      alt: "Apple Store",
      description: "Design excellence",
      color: "from-gray-500 to-slate-600",
      shape: "circle"
    },
    {
      name: "Meta",
      image: "https://i.postimg.cc/xTXZ83YM/Meta-Completes-Another-Round-of-Layoffs.webp",
      alt: "Meta Office",
      description: "Social innovation",
      color: "from-blue-600 to-purple-600",
      shape: "square"
    },
    {
      name: "ICPC Champions",
      image: "https://i.postimg.cc/fyC5gkxc/2021-ICPC-World-Champions.jpg",
      alt: "ICPC World Champions",
      description: "Programming excellence",
      color: "from-yellow-500 to-orange-500",
      shape: "circle"
    },
    {
      name: "IOI Competition",
      image: "https://i.postimg.cc/Gmx747B7/IOI-2023-1.webp",
      alt: "IOI 2023",
      description: "Global programming olympiad",
      color: "from-green-500 to-emerald-500",
      shape: "square"
    },
    {
      name: "CP Excellence",
      image: "https://i.postimg.cc/Bbz4DZXg/ce9fedd7b042038f4b5a597ab8f52d45.jpg",
      alt: "Competitive Programming Contest",
      description: "Competitive programming mastery",
      color: "from-red-500 to-pink-500",
      shape: "circle"
    },
    {
      name: "Tech Innovation",
      image: "https://i.postimg.cc/XYh1bSd5/maxresdefault.jpg",
      alt: "Tech Industry",
      description: "Future of technology",
      color: "from-purple-500 to-pink-500",
      shape: "square"
    },
    {
      name: "Innovation Hub",
      image: "https://i.postimg.cc/gkpwkN3B/maxresdefault-1.jpg",
      alt: "Innovation Hub",
      description: "Next-gen solutions",
      color: "from-cyan-500 to-blue-500",
      shape: "circle"
    },
    {
      name: "Programming Contest",
      image: "https://i.postimg.cc/wv8p94nW/45227950-2137472146284962-8222995478405447680-n.jpg",
      alt: "Programming Competition",
      description: "Competitive spirit",
      color: "from-indigo-500 to-purple-500",
      shape: "square"
    }
  ];

  const getImageClasses = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'aspect-square rounded-full';
      case 'square':
        return 'aspect-square rounded-3xl';
      default:
        return 'aspect-square rounded-3xl';
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background Effects with Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-floating-3d"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-floating-3d" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-500/15 rounded-full blur-3xl animate-floating-3d" style={{animationDelay: '4s'}}></div>
        
        {/* Indian Flag Colors Animation */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <Badge variant="secondary" className="mb-8 gap-3 bg-gradient-to-r from-orange-900/50 to-green-900/50 border-orange-400/30 text-orange-200 hover:bg-orange-800/60 backdrop-blur-sm animate-fade-in card-3d white-glow">
            <Heart className="h-5 w-5 animate-pulse text-red-400" />
            <span className="flex items-center gap-2">
              Building Dreams
              <span className="text-orange-400">🇮🇳</span>
            </span>
          </Badge>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-orange-300 via-white to-green-300 bg-clip-text text-transparent animate-fade-in leading-tight">
            Our Vision for <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-scale-in" style={{animationDelay: '0.3s'}}>NEXTFAANG</span>
          </h2>
          
          <div className="max-w-5xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            <p className="text-2xl text-blue-200 mb-6 leading-relaxed white-text-shadow">
              Our aim is to build a <strong className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent animate-pulse">thriving community</strong> where Indian students excel in global programming competitions
            </p>
            <p className="text-xl text-blue-300 leading-relaxed white-text-shadow">
              Together, we'll make India proud on the world stage of competitive programming and technology innovation 🚀
            </p>
          </div>
        </div>

        {/* Enhanced Company Grid with Alternating Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {companies.map((company, index) => (
            <Card 
              key={company.name} 
              className="group relative overflow-hidden border-2 border-blue-400/30 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-sm hover:border-orange-400/60 transition-all duration-700 hover:scale-110 card-3d white-glow animate-fade-in"
              style={{
                animationDelay: `${index * 0.15}s`,
                transform: index % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'
              }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden group-hover:animate-pulse">
                  <div className={`overflow-hidden ${getImageClasses(company.shape)} group-hover:scale-105 transition-transform duration-500`}>
                    <img 
                      src={company.image} 
                      alt={company.alt}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110 group-hover:saturate-150"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70"></div>
                  
                  {/* Enhanced Company Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-transform duration-500 group-hover:translate-y-0">
                    <div className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${company.color} rounded-full text-white font-bold mb-3 text-base shadow-2xl white-glow animate-pulse`}>
                      <Star className="h-5 w-5 animate-spin" style={{animationDuration: '3s'}} />
                      {company.name}
                    </div>
                    <p className="text-white font-medium text-base animate-fade-in">{company.description}</p>
                  </div>

                  {/* Enhanced Hover Effects with Indian Flag Colors */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-white/10 to-green-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Target className="h-6 w-6 text-yellow-400 animate-spin" style={{animationDuration: '4s'}} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Success Stats with Indian Pride Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-fade-in" style={{animationDelay: '1.2s'}}>
          <div className="text-center p-10 bg-gradient-to-br from-orange-900/40 to-orange-800/40 rounded-3xl border-2 border-orange-400/30 backdrop-blur-sm hover:scale-110 transition-all duration-500 card-3d white-glow">
            <div className="text-5xl font-bold text-orange-300 mb-4 animate-pulse">🎯</div>
            <div className="text-6xl font-bold text-orange-200 mb-3 animate-scale-in">Our Goal</div>
            <div className="text-orange-100 text-lg">Building India's CP Community</div>
            <TrendingUp className="h-8 w-8 text-orange-400 mx-auto mt-4 animate-bounce" />
          </div>
          
          <div className="text-center p-10 bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-3xl border-2 border-green-400/30 backdrop-blur-sm hover:scale-110 transition-all duration-500 card-3d white-glow">
            <div className="text-5xl font-bold text-green-300 mb-4 animate-pulse">🏆</div>
            <div className="text-6xl font-bold text-green-200 mb-3 animate-scale-in">Excellence</div>
            <div className="text-green-100 text-lg">Global Competition Success</div>
            <Star className="h-8 w-8 text-green-400 mx-auto mt-4 animate-spin" style={{animationDuration: '3s'}} />
          </div>
          
          <div className="text-center p-10 bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-3xl border-2 border-blue-400/30 backdrop-blur-sm hover:scale-110 transition-all duration-500 card-3d white-glow">
            <div className="text-5xl font-bold text-blue-300 mb-4 animate-pulse">🇮🇳</div>
            <div className="text-6xl font-bold text-blue-200 mb-3 animate-scale-in">Pride</div>
            <div className="text-blue-100 text-lg">Making India Proud</div>
            <Building2 className="h-8 w-8 text-blue-400 mx-auto mt-4 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

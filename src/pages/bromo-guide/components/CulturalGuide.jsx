import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/appImage';

const CulturalGuide = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const culturalSections = [
  { id: 'overview', name: 'Overview', icon: 'Info' },
  { id: 'tengger', name: 'Tengger People', icon: 'Users' },
  { id: 'ceremonies', name: 'Ceremonies', icon: 'Calendar' },
  { id: 'etiquette', name: 'Etiquette', icon: 'Heart' },
  { id: 'language', name: 'Language', icon: 'MessageCircle' }];


  const culturalContent = {
    overview: {
      title: "Sacred Land of the Tengger",
      content: `Mount Bromo is not just a geological wonder but a sacred landscape deeply intertwined with the spiritual and cultural life of the Tengger people. For over 600 years, this volcanic region has been home to one of Java's last Hindu communities, who maintain ancient traditions and beliefs that predate the arrival of Islam in Java.

The name "Bromo" itself derives from "Brahma," the Hindu god of creation, reflecting the deep spiritual significance of this volcanic landscape. The Tengger people believe that Mount Bromo is a sacred dwelling place of their ancestors and gods, making it essential for visitors to approach this land with respect and understanding.

The Tengger Caldera, known locally as the "Sand Sea" (Lautan Pasir), is considered a sacred space where the physical and spiritual worlds intersect. This unique cultural landscape represents one of Indonesia's most remarkable examples of harmonious coexistence between human communities and dramatic natural forces.`,
      image: "https://images.unsplash.com/photo-1594212804338-78aee888756d",
      imageAlt: "Traditional Tengger village with Mount Bromo in background showing traditional houses and volcanic landscape"
    },
    tengger: {
      title: "The Tengger Community",
      content: `The Tengger people are descendants of the ancient Majapahit Kingdom who fled to the mountains during the Islamic expansion in Java during the 15th century. Today, approximately 600,000 Tengger people live in 30 villages scattered across the Bromo-Tengger-Semeru region, maintaining their unique Hindu-Javanese culture.

Their society is organized around traditional village structures led by spiritual leaders called "Dukun" or "Legen," who serve as intermediaries between the community and the spiritual world. These leaders possess deep knowledge of ancient rituals, traditional medicine, and the complex relationship between the Tengger people and their volcanic environment.

The Tengger economy traditionally revolves around agriculture, particularly the cultivation of vegetables, potatoes, and cabbage in the fertile volcanic soil. Many families have also become involved in tourism, serving as guides, jeep drivers, and homestay operators, creating a bridge between their traditional way of life and the modern world.

Family structures remain strong, with extended families often living in close proximity and maintaining collective responsibility for community welfare. Traditional crafts, including weaving and wood carving, continue to be practiced, though these skills are increasingly rare among younger generations.`,
      image: "https://images.unsplash.com/photo-1734014791656-b27fe072cb6d",
      imageAlt: "Tengger family in traditional dress standing in front of their village home with Mount Bromo visible in the distance"
    },
    ceremonies: {
      title: "Sacred Ceremonies & Festivals",
      content: `The most significant ceremony in Tengger culture is Yadnya Kasada, held annually during the full moon of the Kasada month (usually October or November). This ancient ritual involves offerings of rice, fruits, vegetables, livestock, and money thrown into the Bromo crater to honor Sang Hyang Widhi (the supreme god) and ensure prosperity and protection for the community.

The ceremony begins at midnight at Pura Luhur Poten, a Hindu temple located at the base of Mount Bromo. Hundreds of Tengger families gather to pray and prepare their offerings before making the pilgrimage to the crater rim at sunrise. The ritual concludes with the dramatic throwing of offerings into the active crater, while brave locals climb down into the crater to catch the offerings, which are believed to bring good luck.

Other important ceremonies include Unan-unan (harvest festival), Karo (New Year celebration), and various life-cycle ceremonies marking births, coming of age, marriages, and deaths. Each ceremony involves specific rituals, traditional foods, and community participation that strengthens social bonds and spiritual connections.

These ceremonies are not tourist attractions but deeply sacred events. Visitors who witness them should maintain respectful distance, avoid flash photography, and follow the guidance of local community members.`,
      image: "https://images.unsplash.com/photo-1679141435662-b548b2ae651a",
      imageAlt: "Tengger people in white traditional clothing performing Kasada ceremony at Mount Bromo crater with offerings and incense"
    },
    etiquette: {
      title: "Cultural Etiquette & Respect",
      content: `Visiting Mount Bromo requires sensitivity to local customs and religious beliefs. The Tengger people are generally welcoming to respectful visitors but expect certain standards of behavior in their sacred landscape.

**Dress Code:** Modest clothing is essential, especially when visiting temples or during ceremonies. Cover shoulders and knees, avoid revealing clothing, and remove shoes when entering sacred spaces. White clothing is preferred during religious ceremonies.

**Photography:** Always ask permission before photographing local people, especially during religious ceremonies. Avoid using flash during sacred rituals, and respect areas where photography is prohibited. Many Tengger people are happy to pose for photos but appreciate being asked first.

**Sacred Spaces:** Pura Luhur Poten temple and the crater rim are sacred spaces requiring respectful behavior. Speak quietly, avoid pointing feet toward altars or sacred objects, and follow the lead of local worshippers. Do not touch religious artifacts or offerings.

**Environmental Respect:** The entire Bromo area is considered sacred. Do not litter, damage plants, or disturb wildlife. Stay on designated paths and avoid areas marked as off-limits. The "Sand Sea" is particularly sacred and should be crossed with reverence.

**Economic Interactions:** When hiring local services or buying souvenirs, engage in fair negotiations and pay reasonable prices. Many families depend on tourism income, but avoid creating dependency or disrupting traditional economic patterns.`,
      image: "https://images.unsplash.com/photo-1566969963535-63f7fdbce041",
      imageAlt: "Respectful tourists observing Tengger ceremony from appropriate distance while local people perform traditional rituals"
    },
    language: {
      title: "Language & Communication",
      content: `The Tengger people speak Tenggerese, a unique dialect of Javanese mixed with ancient Sanskrit terms and local vocabulary. While Indonesian (Bahasa Indonesia) is widely understood, learning a few Tenggerese phrases shows respect and often leads to warmer interactions.

**Basic Greetings:**
- "Sugeng enjing" - Good morning -"Sugeng siang"- Good afternoon -"Sugeng dalu"- Good evening -"Matur nuwun"- Thank you -"Nderek langkung" - Excuse me/Sorry

**Useful Phrases:**
- "Kula badhe tindak Bromo" - I want to go to Bromo -"Pinten regane?" - How much does it cost?
- "Saged foto?"- May I take a photo? -"Sampun cekap" - That's enough/sufficient

**Religious Terms:**
- "Sang Hyang Widhi" - The supreme god -"Pura"- Hindu temple -"Sesajen"- Offerings -"Dukun" - Spiritual leader

Many younger Tengger people speak some English, especially those involved in tourism. However, making an effort to use local language, even imperfectly, is always appreciated and often leads to more authentic cultural exchanges and better service.

When communicating, maintain polite, soft-spoken tones as loud or aggressive speech is considered disrespectful. Patience is valued, and rushing conversations or negotiations may be counterproductive.`,
      image: "https://images.unsplash.com/photo-1675018059715-70193584c1b2",
      imageAlt: "Friendly conversation between tourists and local Tengger guide with traditional village setting and mountain backdrop"
    }
  };

  const currentContent = culturalContent?.[activeSection];

  const culturalTips = [
  {
    icon: 'Heart',
    title: 'Show Genuine Interest',
    description: 'Ask respectful questions about Tengger culture and traditions'
  },
  {
    icon: 'Gift',
    title: 'Bring Appropriate Offerings',
    description: 'Small gifts like fruits or flowers are appreciated at temples'
  },
  {
    icon: 'Clock',
    title: 'Allow Extra Time',
    description: 'Cultural interactions should not be rushed - embrace the pace'
  },
  {
    icon: 'Users',
    title: 'Engage with Families',
    description: 'Homestays offer authentic cultural immersion opportunities'
  },
  {
    icon: 'Leaf',
    title: 'Respect Nature',
    description: 'The Tengger view nature as sacred - follow their example'
  },
  {
    icon: 'Book',
    title: 'Learn the History',
    description: 'Understanding Tengger history enhances your experience'
  }];


  return (
    <div className="bg-card rounded-xl p-6 volcanic-glow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
          <Icon name="Globe" size={24} className="text-primary" />
          Cultural Guide & Local Customs
        </h3>
      </div>
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {culturalSections?.map((section) =>
        <button
          key={section?.id}
          onClick={() => setActiveSection(section?.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          activeSection === section?.id ?
          'bg-primary text-primary-foreground volcanic-glow' :
          'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'}`
          }>

            <Icon name={section?.icon} size={16} />
            {section?.name}
          </button>
        )}
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <h4 className="text-lg font-semibold text-text-primary mb-4">
            {currentContent?.title}
          </h4>
          <div className="prose prose-sm max-w-none text-text-secondary">
            {currentContent?.content?.split('\n\n')?.map((paragraph, index) => {
              if (paragraph?.startsWith('**') && paragraph?.endsWith('**')) {
                return (
                  <h5 key={index} className="font-semibold text-text-primary mt-4 mb-2">
                    {paragraph?.replace(/\*\*/g, '')}
                  </h5>);

              }
              if (paragraph?.startsWith('- ')) {
                const lines = paragraph?.split('\n');
                return (
                  <ul key={index} className="list-disc list-inside space-y-1 my-3">
                    {lines?.map((line, lineIndex) =>
                    <li key={lineIndex} className="text-sm">
                        {line?.replace('- ', '')}
                      </li>
                    )}
                  </ul>);

              }
              return (
                <p key={index} className="mb-4 text-sm leading-relaxed">
                  {paragraph}
                </p>);

            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={currentContent?.image}
              alt={currentContent?.imageAlt}
              className="w-full h-48 object-cover" />

          </div>

          {activeSection === 'overview' &&
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Star" size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-amber-800 mb-2">Did You Know?</div>
                  <div className="text-sm text-amber-700">
                    The Tengger people are one of the few remaining Hindu communities in Java, 
                    maintaining traditions that have survived for over 600 years in this volcanic landscape.
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
      {/* Cultural Tips */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4">
          Cultural Interaction Tips
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {culturalTips?.map((tip, index) =>
          <div key={index} className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={tip?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h5 className="font-medium text-text-primary mb-1">{tip?.title}</h5>
                  <p className="text-sm text-text-secondary">{tip?.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Cultural Calendar */}
      {activeSection === 'ceremonies' &&
      <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold text-text-primary mb-4">
            Annual Cultural Calendar
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Calendar" size={16} className="text-blue-600" />
                <span className="font-medium text-blue-800">Yadnya Kasada</span>
              </div>
              <div className="text-sm text-blue-700 mb-1">
                <strong>When:</strong> October/November (Full Moon)
              </div>
              <div className="text-sm text-blue-700">
                The most important ceremony with offerings thrown into Bromo crater
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Leaf" size={16} className="text-green-600" />
                <span className="font-medium text-green-800">Unan-unan</span>
              </div>
              <div className="text-sm text-green-700 mb-1">
                <strong>When:</strong> After Harvest Season
              </div>
              <div className="text-sm text-green-700">
                Harvest festival celebrating agricultural abundance
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sparkles" size={16} className="text-purple-600" />
                <span className="font-medium text-purple-800">Karo</span>
              </div>
              <div className="text-sm text-purple-700 mb-1">
                <strong>When:</strong> Tengger New Year
              </div>
              <div className="text-sm text-purple-700">
                New Year celebration with community gatherings and prayers
              </div>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Sun" size={16} className="text-orange-600" />
                <span className="font-medium text-orange-800">Galungan & Kuningan</span>
              </div>
              <div className="text-sm text-orange-700 mb-1">
                <strong>When:</strong> Every 210 Days
              </div>
              <div className="text-sm text-orange-700">
                Hindu celebration of good over evil with temple ceremonies
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default CulturalGuide;
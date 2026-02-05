import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';

import {
  Carousel,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
  NeobrutalismThemeProvider,
} from 'react-native-neobrutalism';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Carousel>;

// Sample slide colors
const slideColors = ['#88AAEE', '#A388EE', '#EE88AA', '#AAEE88', '#EEAA88'];

// Sample slide component
function Slide({
  index,
  color,
}: {
  index: number;
  color: string;
}): React.JSX.Element {
  return (
    <View style={[styles.slide, { backgroundColor: color }]}>
      <Text style={styles.slideText}>Slide {index + 1}</Text>
    </View>
  );
}

// Default
export const Default: Story = {
  render: () => (
    <Carousel>
      {slideColors.map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// With Navigation Only
export const WithNavigationOnly: Story = {
  render: () => (
    <Carousel>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

// With Indicators Only
export const WithIndicatorsOnly: Story = {
  render: () => (
    <Carousel>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselIndicators />
    </Carousel>
  ),
};

// Auto Play
export const AutoPlay: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={2000}>
      {slideColors.map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselIndicators />
    </Carousel>
  ),
};

// Auto Play with Loop
export const AutoPlayWithLoop: Story = {
  render: () => (
    <Carousel autoPlay autoPlayInterval={2000} loop>
      {slideColors.map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Loop Enabled
export const LoopEnabled: Story = {
  render: () => (
    <Carousel loop>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Controlled
export const Controlled: Story = {
  render: function ControlledCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
      <View style={{ gap: 16 }}>
        <Text style={styles.label}>Active Index: {activeIndex}</Text>
        <Carousel
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
        >
          {slideColors.slice(0, 3).map((color, index) => (
            <CarouselItem key={index}>
              <Slide index={index} color={color} />
            </CarouselItem>
          ))}
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
        <View style={styles.buttonRow}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.indexButton,
                activeIndex === index && styles.indexButtonActive,
              ]}
              onTouchEnd={() => setActiveIndex(index)}
            >
              <Text
                style={[
                  styles.indexButtonText,
                  activeIndex === index && styles.indexButtonTextActive,
                ]}
              >
                {index + 1}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  },
};

// With Images
export const WithImages: Story = {
  render: () => (
    <Carousel>
      <CarouselItem>
        <Image
          source={{ uri: 'https://picsum.photos/400/200?random=1' }}
          style={styles.image}
        />
      </CarouselItem>
      <CarouselItem>
        <Image
          source={{ uri: 'https://picsum.photos/400/200?random=2' }}
          style={styles.image}
        />
      </CarouselItem>
      <CarouselItem>
        <Image
          source={{ uri: 'https://picsum.photos/400/200?random=3' }}
          style={styles.image}
        />
      </CarouselItem>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Card Carousel
export const CardCarousel: Story = {
  render: () => (
    <Carousel>
      {[1, 2, 3].map((num) => (
        <CarouselItem key={num}>
          <View style={styles.card}>
            <View style={styles.cardAvatar}>
              <Text style={styles.cardAvatarText}>U{num}</Text>
            </View>
            <Text style={styles.cardTitle}>User {num}</Text>
            <Text style={styles.cardDescription}>
              This is a description for user {num}.
            </Text>
          </View>
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Vertical Orientation
export const VerticalOrientation: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider>
        <View style={{ padding: 20, width: '100%', maxWidth: 400, height: 300 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Carousel orientation="vertical" itemSize={200}>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Custom Item Size
export const CustomItemSize: Story = {
  render: () => (
    <Carousel itemSize={300}>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// With Custom Theme
export const CustomTheme: Story = {
  decorators: [
    (Story) => (
      <NeobrutalismThemeProvider
        theme={{
          shadow: { offsetX: 6, offsetY: 6, color: '#333' },
          border: { radius: 16 },
          colors: { primary: '#FF6B6B' },
        }}
      >
        <View style={{ padding: 20, width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </NeobrutalismThemeProvider>
    ),
  ],
  render: () => (
    <Carousel>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// No Shadow
export const NoShadow: Story = {
  render: () => (
    <Carousel shadowStyle={null}>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious shadowStyle={null} />
      <CarouselNext shadowStyle={null} />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Start at Index
export const StartAtIndex: Story = {
  render: () => (
    <Carousel defaultActiveIndex={2}>
      {slideColors.map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators />
    </Carousel>
  ),
};

// Custom Indicators
export const CustomIndicators: Story = {
  render: () => (
    <Carousel>
      {slideColors.slice(0, 3).map((color, index) => (
        <CarouselItem key={index}>
          <Slide index={index} color={color} />
        </CarouselItem>
      ))}
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators
        dotStyle={{ width: 12, height: 12, borderRadius: 6 }}
        activeDotStyle={{ backgroundColor: '#FF6B6B' }}
      />
    </Carousel>
  ),
};

const styles = StyleSheet.create({
  slide: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  indexButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexButtonActive: {
    backgroundColor: '#88AAEE',
  },
  indexButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  indexButtonTextActive: {
    color: '#000',
  },
  image: {
    width: '100%',
    height: 200,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#88AAEE',
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardAvatarText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

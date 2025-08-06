import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const InfoCard = ({ icon, label, value }: InfoCardProps) => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#2A2A2A',
      borderRadius: 12,
      padding: 12,
      margin: 6,
      minWidth: '45%',
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
      {icon}
      <Text style={{ color: '#EC8B00', marginLeft: 6, fontWeight: '600' }}>{label}</Text>
    </View>
    <Text
      style={{ color: 'white', fontWeight: '500' }}
      numberOfLines={1}
    >
      {value}
    </Text>
  </View>
);

interface MovieInfoGridProps {
  rating: number;
  releaseDate: string;
  votes: number;
  popularity: number;
}

const MovieInfoGrid = ({ rating, releaseDate, votes, popularity }: MovieInfoGridProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
      }}
    >
      <InfoCard
        icon={<FontAwesome name="star" size={16} color="#EC8B00" />}
        label="NOTA"
        value={rating.toFixed(1)}
      />
      <InfoCard
        icon={<Feather name="calendar" size={16} color="#EC8B00" />}
        label="LANÇAMENTO"
        value={releaseDate}
      />
      <InfoCard
        icon={<Feather name="heart" size={16} color="#EC8B00" />}
        label="VOTOS"
        value={votes.toString()}
      />
      <InfoCard
        icon={<Feather name="activity" size={16} color="#EC8B00" />}
        label="POPULARIDADE"
        value={popularity.toFixed(0)}
      />
    </View>
  );
};

export default MovieInfoGrid;

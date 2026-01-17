/**
 * AILocalPulse
 * 
 * Local intelligence dashboard.
 * AI monitors the local area and surfaces:
 * - Upcoming events (sports, concerts, festivals)
 * - Weather impact on business
 * - Local trends and viral content
 * - Community happenings
 * - Demographic insights
 * 
 * Helps business owners capitalize on local opportunities.
 */

import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Wind,
  TrendingUp,
  Users,
  Music,
  Trophy,
  Ticket,
  Building,
  Coffee,
  ShoppingBag,
  Clock,
  ChevronRight,
  ExternalLink,
  Bell,
  Zap,
  ThermometerSun
} from 'lucide-react';

export function AILocalPulse({ onAction }) {
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Location data
  const location = {
    city: 'Dallas',
    neighborhood: 'Deep Ellum',
    coordinates: { lat: 32.7767, lng: -96.7970 }
  };

  // Weather data
  const weather = {
    current: {
      temp: 72,
      condition: 'Sunny',
      humidity: 45,
      wind: 8
    },
    forecast: [
      { day: 'Today', high: 75, low: 58, condition: 'sunny', impact: 'positive' },
      { day: 'Tomorrow', high: 78, low: 62, condition: 'sunny', impact: 'positive' },
      { day: 'Saturday', high: 72, low: 55, condition: 'cloudy', impact: 'neutral' },
      { day: 'Sunday', high: 68, low: 52, condition: 'rain', impact: 'negative' },
      { day: 'Monday', high: 65, low: 48, condition: 'cloudy', impact: 'neutral' }
    ],
    businessImpact: {
      summary: 'Great weather this weekend! Expect 20% higher foot traffic.',
      recommendation: 'Consider outdoor seating and cold beverages promotion.'
    }
  };

  // Local events
  const events = [
    {
      id: 1,
      name: 'Dallas Marathon',
      type: 'sports',
      date: 'Sunday, Oct 15',
      time: '7:00 AM - 2:00 PM',
      distance: 0.2,
      expectedAttendance: 25000,
      impact: 'high',
      impactDescription: '+40% foot traffic expected based on last year',
      recommendation: 'Open early, prep grab-and-go items, extra staff 6-10am',
      historicalData: {
        lastYear: '+38% revenue',
        avgTicket: '+12%'
      }
    },
    {
      id: 2,
      name: 'Deep Ellum Arts Festival',
      type: 'festival',
      date: 'Saturday, Oct 14',
      time: '11:00 AM - 10:00 PM',
      distance: 0.1,
      expectedAttendance: 15000,
      impact: 'high',
      impactDescription: 'Street closures nearby, massive foot traffic',
      recommendation: 'Festival special menu, extend hours, social media push',
      historicalData: {
        lastYear: '+52% revenue',
        avgTicket: '+8%'
      }
    },
    {
      id: 3,
      name: 'Cowboys vs Eagles',
      type: 'sports',
      date: 'Sunday, Oct 15',
      time: '3:25 PM',
      distance: 8.5,
      expectedAttendance: 80000,
      impact: 'medium',
      impactDescription: 'Game day crowd, pre/post game traffic',
      recommendation: 'Game day specials, TV visibility, team promotions',
      historicalData: {
        lastYear: '+25% revenue',
        avgTicket: '+15%'
      }
    },
    {
      id: 4,
      name: 'Taylor Swift Concert',
      type: 'concert',
      date: 'Friday, Oct 13',
      time: '7:00 PM',
      distance: 5.2,
      expectedAttendance: 70000,
      impact: 'medium',
      impactDescription: 'Concert crowd, mostly evening impact',
      recommendation: 'Swift-themed specials, Instagram-worthy items',
      historicalData: null
    },
    {
      id: 5,
      name: 'Farmers Market',
      type: 'community',
      date: 'Every Saturday',
      time: '8:00 AM - 1:00 PM',
      distance: 0.3,
      expectedAttendance: 2000,
      impact: 'low',
      impactDescription: 'Regular weekly foot traffic boost',
      recommendation: 'Source local ingredients, mention on menu',
      historicalData: {
        avgImpact: '+8% Saturday mornings'
      }
    }
  ];

  // Local trends
  const trends = [
    {
      id: 1,
      topic: 'Pumpkin Spice',
      type: 'seasonal',
      growth: 340,
      source: 'Google Trends',
      relevance: 'high',
      suggestion: 'Add pumpkin spice items to menu'
    },
    {
      id: 2,
      topic: '#DeepEllumEats',
      type: 'social',
      growth: 125,
      source: 'Instagram',
      relevance: 'high',
      suggestion: 'Use hashtag, engage with posts'
    },
    {
      id: 3,
      topic: 'Spicy Food Challenge',
      type: 'viral',
      growth: 89,
      source: 'TikTok',
      relevance: 'medium',
      suggestion: 'Create challenge menu item'
    },
    {
      id: 4,
      topic: 'Outdoor Dining',
      type: 'preference',
      growth: 45,
      source: 'Yelp Reviews',
      relevance: 'medium',
      suggestion: 'Highlight patio seating'
    }
  ];

  // Demographics
  const demographics = {
    peakHours: [
      { time: '11am-1pm', traffic: 85, type: 'Lunch crowd' },
      { time: '5pm-7pm', traffic: 72, type: 'After work' },
      { time: '7pm-9pm', traffic: 95, type: 'Dinner rush' }
    ],
    visitorTypes: [
      { type: 'Local regulars', percentage: 45 },
      { type: 'Office workers', percentage: 25 },
      { type: 'Tourists', percentage: 18 },
      { type: 'Event attendees', percentage: 12 }
    ],
    nearbyBusinesses: [
      { name: 'Office Complex', distance: 0.1, employees: 2000 },
      { name: 'Hotel Dallas', distance: 0.2, rooms: 350 },
      { name: 'Convention Center', distance: 0.4, capacity: 5000 }
    ]
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny': return Sun;
      case 'cloudy': return Cloud;
      case 'rain': return CloudRain;
      case 'snow': return Snowflake;
      default: return Cloud;
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'sports': return Trophy;
      case 'concert': return Music;
      case 'festival': return Ticket;
      case 'community': return Users;
      default: return Calendar;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return '#22c55e';
      case 'medium': return '#eab308';
      case 'low': return '#3b82f6';
      case 'positive': return '#22c55e';
      case 'negative': return '#ef4444';
      case 'neutral': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const handlePrepareForEvent = (event) => {
    onAction([{
      type: 'event_preparation',
      event: event.name,
      date: event.date,
      recommendation: event.recommendation
    }]);
  };

  const tabs = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'weather', label: 'Weather', icon: Cloud },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'area', label: 'Area Intel', icon: MapPin }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <MapPin size={24} style={{ color: '#8b5cf6' }} />
          <div>
            <h2 style={styles.title}>Local Pulse</h2>
            <p style={styles.subtitle}>
              {location.neighborhood}, {location.city} • What's happening nearby
            </p>
          </div>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.alertButton}>
            <Bell size={16} />
            Set Alerts
          </button>
        </div>
      </div>

      {/* Quick Weather Summary */}
      <div style={styles.weatherBanner}>
        <div style={styles.weatherCurrent}>
          <Sun size={32} color="#eab308" />
          <div>
            <span style={styles.weatherTemp}>{weather.current.temp}°F</span>
            <span style={styles.weatherCondition}>{weather.current.condition}</span>
          </div>
        </div>
        <div style={styles.weatherImpact}>
          <Zap size={16} color="#22c55e" />
          <span>{weather.businessImpact.summary}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.tabActive : {})
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={styles.content}>
        {/* Events Tab */}
        {activeTab === 'events' && (
          <div style={styles.eventsGrid}>
            {events.map(event => {
              const Icon = getEventIcon(event.type);
              return (
                <div key={event.id} style={styles.eventCard}>
                  <div style={styles.eventHeader}>
                    <div style={{
                      ...styles.eventIcon,
                      backgroundColor: `${getImpactColor(event.impact)}20`,
                      color: getImpactColor(event.impact)
                    }}>
                      <Icon size={20} />
                    </div>
                    <div style={styles.eventInfo}>
                      <h3 style={styles.eventName}>{event.name}</h3>
                      <div style={styles.eventMeta}>
                        <span><Calendar size={12} /> {event.date}</span>
                        <span><Clock size={12} /> {event.time}</span>
                        <span><MapPin size={12} /> {event.distance} mi</span>
                      </div>
                    </div>
                    <div style={{
                      ...styles.impactBadge,
                      backgroundColor: `${getImpactColor(event.impact)}20`,
                      color: getImpactColor(event.impact)
                    }}>
                      {event.impact} impact
                    </div>
                  </div>

                  <div style={styles.eventBody}>
                    <div style={styles.eventStat}>
                      <Users size={14} />
                      <span>{event.expectedAttendance.toLocaleString()} expected</span>
                    </div>
                    <p style={styles.eventImpact}>{event.impactDescription}</p>
                    
                    {event.historicalData && (
                      <div style={styles.historicalData}>
                        <span style={styles.historicalLabel}>Last Year:</span>
                        {event.historicalData.lastYear && (
                          <span style={styles.historicalValue}>{event.historicalData.lastYear}</span>
                        )}
                        {event.historicalData.avgImpact && (
                          <span style={styles.historicalValue}>{event.historicalData.avgImpact}</span>
                        )}
                      </div>
                    )}

                    <div style={styles.recommendationBox}>
                      <Zap size={14} />
                      <span>{event.recommendation}</span>
                    </div>
                  </div>

                  <div style={styles.eventActions}>
                    <button 
                      style={styles.prepareButton}
                      onClick={() => handlePrepareForEvent(event)}
                    >
                      Prepare for Event
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div style={styles.weatherContent}>
            <div style={styles.forecastGrid}>
              {weather.forecast.map((day, i) => {
                const WeatherIcon = getWeatherIcon(day.condition);
                return (
                  <div key={i} style={styles.forecastCard}>
                    <span style={styles.forecastDay}>{day.day}</span>
                    <WeatherIcon 
                      size={32} 
                      color={day.condition === 'sunny' ? '#eab308' : 
                             day.condition === 'rain' ? '#3b82f6' : '#6b7280'} 
                    />
                    <div style={styles.forecastTemps}>
                      <span style={styles.forecastHigh}>{day.high}°</span>
                      <span style={styles.forecastLow}>{day.low}°</span>
                    </div>
                    <span style={{
                      ...styles.forecastImpact,
                      color: getImpactColor(day.impact)
                    }}>
                      {day.impact === 'positive' ? '↑ Good for business' :
                       day.impact === 'negative' ? '↓ May reduce traffic' :
                       '→ Normal day'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={styles.weatherRecommendation}>
              <ThermometerSun size={20} />
              <div>
                <h4 style={styles.weatherRecTitle}>Weather Strategy</h4>
                <p style={styles.weatherRecText}>{weather.businessImpact.recommendation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div style={styles.trendsList}>
            {trends.map(trend => (
              <div key={trend.id} style={styles.trendCard}>
                <div style={styles.trendHeader}>
                  <div style={styles.trendTopic}>
                    <span style={styles.trendName}>{trend.topic}</span>
                    <span style={styles.trendType}>{trend.type}</span>
                  </div>
                  <div style={styles.trendGrowth}>
                    <TrendingUp size={16} color="#22c55e" />
                    <span>+{trend.growth}%</span>
                  </div>
                </div>
                <div style={styles.trendBody}>
                  <span style={styles.trendSource}>Source: {trend.source}</span>
                  <div style={{
                    ...styles.trendRelevance,
                    backgroundColor: `${getImpactColor(trend.relevance)}20`,
                    color: getImpactColor(trend.relevance)
                  }}>
                    {trend.relevance} relevance
                  </div>
                </div>
                <div style={styles.trendSuggestion}>
                  <Zap size={14} />
                  <span>{trend.suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Area Intel Tab */}
        {activeTab === 'area' && (
          <div style={styles.areaContent}>
            {/* Peak Hours */}
            <div style={styles.areaSection}>
              <h3 style={styles.areaSectionTitle}>
                <Clock size={18} />
                Peak Hours (Your Area)
              </h3>
              <div style={styles.peakHoursGrid}>
                {demographics.peakHours.map((hour, i) => (
                  <div key={i} style={styles.peakHourCard}>
                    <div style={styles.peakHourBar}>
                      <div style={{
                        ...styles.peakHourFill,
                        height: `${hour.traffic}%`
                      }} />
                    </div>
                    <span style={styles.peakHourTime}>{hour.time}</span>
                    <span style={styles.peakHourType}>{hour.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visitor Types */}
            <div style={styles.areaSection}>
              <h3 style={styles.areaSectionTitle}>
                <Users size={18} />
                Who Visits This Area
              </h3>
              <div style={styles.visitorTypes}>
                {demographics.visitorTypes.map((visitor, i) => (
                  <div key={i} style={styles.visitorType}>
                    <div style={styles.visitorInfo}>
                      <span style={styles.visitorName}>{visitor.type}</span>
                      <span style={styles.visitorPercent}>{visitor.percentage}%</span>
                    </div>
                    <div style={styles.visitorBar}>
                      <div style={{
                        ...styles.visitorFill,
                        width: `${visitor.percentage}%`
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Businesses */}
            <div style={styles.areaSection}>
              <h3 style={styles.areaSectionTitle}>
                <Building size={18} />
                Traffic Generators Nearby
              </h3>
              <div style={styles.nearbyList}>
                {demographics.nearbyBusinesses.map((biz, i) => (
                  <div key={i} style={styles.nearbyCard}>
                    <Building size={20} />
                    <div style={styles.nearbyInfo}>
                      <span style={styles.nearbyName}>{biz.name}</span>
                      <span style={styles.nearbyMeta}>
                        {biz.distance} mi • {biz.employees ? `${biz.employees.toLocaleString()} employees` : 
                                             biz.rooms ? `${biz.rooms} rooms` :
                                             `${biz.capacity.toLocaleString()} capacity`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: '4px 0 0 0'
  },
  headerRight: {},
  alertButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '8px',
    color: 'var(--color-text)',
    fontSize: '13px',
    cursor: 'pointer'
  },
  weatherBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.1), rgba(249, 115, 22, 0.1))',
    borderRadius: '16px',
    border: '1px solid rgba(234, 179, 8, 0.2)'
  },
  weatherCurrent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  weatherTemp: {
    fontSize: '32px',
    fontWeight: 700,
    marginRight: '8px'
  },
  weatherCondition: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  weatherImpact: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#22c55e'
  },
  tabs: {
    display: 'flex',
    gap: '8px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '16px'
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: 'var(--color-text-muted)',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  tabActive: {
    backgroundColor: 'var(--color-primary)',
    color: '#ffffff'
  },
  content: {},
  eventsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  eventCard: {
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden'
  },
  eventHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)'
  },
  eventIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  eventInfo: {
    flex: 1
  },
  eventName: {
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 8px 0'
  },
  eventMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  impactBadge: {
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  eventBody: {
    padding: '20px 24px'
  },
  eventStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '12px'
  },
  eventImpact: {
    fontSize: '14px',
    margin: '0 0 16px 0',
    lineHeight: 1.5
  },
  historicalData: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '13px'
  },
  historicalLabel: {
    color: 'var(--color-text-muted)'
  },
  historicalValue: {
    padding: '4px 10px',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: '8px',
    color: '#22c55e',
    fontWeight: 500
  },
  recommendationBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 16px',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#8b5cf6'
  },
  eventActions: {
    padding: '16px 24px',
    backgroundColor: 'var(--color-surface-2)'
  },
  prepareButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: 'var(--color-primary)',
    border: 'none',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  weatherContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  forecastGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '16px'
  },
  forecastCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 16px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  forecastDay: {
    fontSize: '14px',
    fontWeight: 600
  },
  forecastTemps: {
    display: 'flex',
    gap: '8px'
  },
  forecastHigh: {
    fontSize: '18px',
    fontWeight: 700
  },
  forecastLow: {
    fontSize: '18px',
    color: 'var(--color-text-muted)'
  },
  forecastImpact: {
    fontSize: '11px',
    fontWeight: 500,
    textAlign: 'center'
  },
  weatherRecommendation: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '16px',
    padding: '24px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  weatherRecTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0'
  },
  weatherRecText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    margin: 0,
    lineHeight: 1.5
  },
  trendsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  trendCard: {
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '16px',
    border: '1px solid var(--color-border)'
  },
  trendHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  },
  trendTopic: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  trendName: {
    fontSize: '16px',
    fontWeight: 600
  },
  trendType: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    textTransform: 'capitalize'
  },
  trendGrowth: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '16px',
    fontWeight: 700,
    color: '#22c55e'
  },
  trendBody: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px'
  },
  trendSource: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  },
  trendRelevance: {
    padding: '4px 10px',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  trendSuggestion: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  areaContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  areaSection: {},
  areaSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 20px 0'
  },
  peakHoursGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  peakHourCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  peakHourBar: {
    width: '40px',
    height: '80px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end'
  },
  peakHourFill: {
    width: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '8px',
    transition: 'height 0.3s'
  },
  peakHourTime: {
    fontSize: '13px',
    fontWeight: 600
  },
  peakHourType: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  visitorTypes: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  visitorType: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  visitorInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  visitorName: {
    fontSize: '14px',
    fontWeight: 500
  },
  visitorPercent: {
    fontSize: '14px',
    fontWeight: 600
  },
  visitorBar: {
    height: '8px',
    backgroundColor: 'var(--color-surface-2)',
    borderRadius: '4px',
    overflow: 'hidden'
  },
  visitorFill: {
    height: '100%',
    backgroundColor: 'var(--color-primary)',
    borderRadius: '4px'
  },
  nearbyList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px'
  },
  nearbyCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)'
  },
  nearbyInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  nearbyName: {
    fontSize: '14px',
    fontWeight: 600
  },
  nearbyMeta: {
    fontSize: '12px',
    color: 'var(--color-text-muted)'
  }
};

export default AILocalPulse;
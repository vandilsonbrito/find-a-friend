import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui/card'

export function LoadingCardEffect() {
  return (
    <motion.div
      transition={{ duration: 0.8, ease: 'easeOut' }}
      initial={{ y: 30, scale: 1, opacity: 0.7 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      className="hover:shadow-xl transition-shadow rounded-md border border-border"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            <motion.div
              className="h-6 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          </CardTitle>
          <div className="space-y-2 text-muted-foreground text-sm">
            <div className="space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded"
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'linear',
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.1,
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              <motion.div
                className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded w-3/4"
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'linear',
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.2,
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 text-sm">
            <motion.div
              className="h-4 w-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded mt-0.5 flex-shrink-0"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.3,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
            <div className="flex-1 space-y-1">
              <motion.div
                className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded"
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'linear',
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.4,
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              <motion.div
                className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded w-2/3"
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 1.5,
                  ease: 'linear',
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.5,
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <motion.div
              className="h-4 w-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.6,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
            <motion.div
              className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded w-32"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.7,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          <div className="bg-secondary/50 rounded-lg p-3 text-center">
            <motion.div
              className="h-4 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded mx-auto w-24 mb-2"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.8,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
            <motion.div
              className="h-8 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded mx-auto w-12"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.9,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          </div>

          <div className="space-y-2">
            <motion.div
              className="w-full h-10 bg-gradient-to-r from-muted via-muted-foreground/20 to-muted rounded-md"
              animate={{
                backgroundPosition: ['200% 0', '-200% 0'],
              }}
              transition={{
                duration: 1.5,
                ease: 'linear',
                repeat: Number.POSITIVE_INFINITY,
                delay: 1.0,
              }}
              style={{
                backgroundSize: '200% 100%',
              }}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
